const fs = require("fs")
fs.readFile("nums.txt", (error,data) => {
    if (error) console.error(error)
    else {
        const lista = data.toString()
        let split_lista = lista.split(",")
        let ret_lista = 0

        for(i=0; i < split_lista.length;i++){
            ret_lista = ret_lista + Number(split_lista[i])
        }
        console.log("Sum is " + ret_lista)
    }
})

console.log("Reading file and calculating summary...")