
const path = require('path')

if (process.argv.length <= 3 || isNaN(process.argv[2]) || isNaN(process.argv[3]) || isNaN(process.argv[4])) {
  console.log(`Usage: ${path.basename(__filename)} RANDOMIZED_NUMBERS_COUNT MIN_VALUE MAX_VALUE`)
  process.exit(-1)
}

const times  = process.argv[2]
const min = process.argv[3]
const max = process.argv[4]

lista = []

function RandomInt(times, min, max) {
    for (i = 0; i < times;i++) {
        min = Math.ceil(min);
        max = Math.floor(max);
        lista.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
}
RandomInt(times,min,max)

console.log(lista)