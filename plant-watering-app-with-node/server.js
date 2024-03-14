const http = require('http').createServer(handler);
const fs = require('fs');
const io = require('socket.io')(http) //io-handler
const Gpio = require('onoff').Gpio; // Gpio-ohjaus
const pump = new Gpio(21,'out'); // GPIO21 outputiksi

const express = require("express");
const app = express()
app.use(express.json())

const Influx = require("influx");
const { response } = require('express');

http.listen(8080); // kuuntelee lokaalia porttia 8080

const influx = new Influx.InfluxDB({ // tietokanta
    host : "localhost",
    database: "ruuvi",
    schema: [
        {
            measurement: "ruuvi_measurements",
            fields:{temperature: Influx.FieldType.FLOAT},
            tags: ["dataFormat"]
        }
    ]
})
influx.getDatabaseNames() //tietokantayhteys
    .then(names => {
        if (!names.includes("ruuvi_measurements")) {
            return influx.createDatabase("ruuvi_measurements") // luo uusi tietokanta jos ei löydy
        }
    })
    .then(()=>{
        app.listen(app.get("port"), () => {
            console.log("Database connection established...");
        })
    })

async function handler (req,res) { // webbi-funktio
    let haku = await influx.query(`
        select * from ruuvi_measurements group by * order by desc limit 1`)
        .then(result => result = result)
        .catch(error => console.log({error}))
    let hum = ""
    hum += haku[0].humidity
    let temp = ""
    temp += haku[0].temperature

    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data + "<br><br>");
        res.write("Lämpötila: "+temp +"°C"+"<br>")
        res.write("Kosteusprosentti: "+hum+ "%")
        return res.end();
    })
}

io.sockets.on('connection',async function(socket){ // socket-yhteys Gpio <-> palvelin
    let waterflow = 0;
    let haku = await influx.query(`
        select * from ruuvi_measurements group by * order by desc limit 1`) // query
        .then(result => result = result)
        .catch(error => console.log({error}))
    let hum = ""
    hum += haku[0].humidity //
    //hum += 67 //testi, poista hum edessä olevat kenoviivat
    if (hum < 60){ // jos kosteus% alle 60 niin pumppu päälle
        waterflow = 1
        pump.writeSync(1) // writeSync antaa gpio:lle joko 1 tai 0, päälle tai pois
        console.log(waterflow)
        console.log("pumppu päällä")
    } else {
        waterflow = 0
        pump.writeSync(0) //jos kosteusprosentti yli 60, ohjausbitti 0
        console.log(waterflow)
        console.log("pumppu pois päältä")
    }
    socket.on('water', function(data){ // käyttöliittymän checkbox ohjauksen gpio-funktio. 
        waterflow = data; // data-muuttujaan tulee käyttöliittymältä checkboxin arvo 1 tai 0
        console.log(waterflow)
        if (waterflow != pump.readSync()) { // jos readSync eri kuin data-muuttujan arvo, antaa ohjausbitiksi vastaisen.
            pump.writeSync(waterflow)
            console.log(waterflow)
            console.log("pumppu päällä")
        } else {
            console.log(waterflow)
            console.log("pumppu on pois päältä")
        }
    })
})






