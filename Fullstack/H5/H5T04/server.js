const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const fs = require("fs")

let counter = 0

const server = http.createServer((req, res) => {

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')

    counter = String(counter) // muunnetaan counter-muuttuja stringiksi
    fs.writeFileSync("requestcounter.txt", counter); // kirjoitetaan tiedostoon

    counter = fs.readFileSync("requestcounter.txt",{encoding:"utf-8", flag:"r"}); //haetaan muuttuja tiedostosta synkronisesti

    counter = Number(counter) + 1 // muuttujasta int ja lisätään 1
    counter = String(counter) // muuttuja takaisin stringiksi

    res.write("Request counter value is "+ counter) // kirjoitetaan muuttuja sivulle
    res.end()
    })

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})