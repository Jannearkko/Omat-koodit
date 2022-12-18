const { response, request } = require("express");
const express = require("express");
const Influx = require("influx");
const cors = require("cors")
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.listen(port,()=>{
    console.log("Listening on port 3001...")
})

const apiKey = `${process.env.API_KEY}`;

const influx = new Influx.InfluxDB({
    host : "localhost",
    database: "ruuvi",
    schema: [
        {
            measurement: "ruuvi_measurements",
            fields:{temperature: Influx.FieldType.FLOAT, time: Influx.FieldType.FLOAT},
            tags: ["dataFormat"]
        }
    ]
})

influx.getDatabaseNames()
    .then(names => {
        if (!names.includes("ruuvi_measurements")) {
            return influx.createDatabase("ruuvi_measurements")
        }
    })
    .then(()=>{
        app.listen(app.get("port"), () => {
            console.log("Database connection established...");
        })
    })

app.get("/now", async (request,response)=>{
    influx.query(`
        select * from ruuvi_measurements group by * order by desc limit 1`)
        .then(result => response.status(200).json(result))
        .catch(error => response.status(500).json({error}))
})
app.get("/24", async (request,response)=>{
    influx.query(`
        select temperature from ruuvi_measurements where time > now() - 24h group by * order by asc`)
        .then(result => response.status(200).json(result))
        .catch(error => response.status(500).json({error}))
})

