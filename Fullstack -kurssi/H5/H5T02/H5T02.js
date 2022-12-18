// User moduuli käyttöön
const ukkeli = require("./user")

let name = "Turo Kiiski"
let location = "Vittulanjänkä"
let bd = ukkeli.bd

console.log(ukkeli.getName(name) + ukkeli.getLocation(location)+ bd)