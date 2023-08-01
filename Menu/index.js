async function loadMenu() {
    try {
        let response = await fetch("https://www.lounaat.info/lounas/buugi-ravintola/jyvaskyla", { mode: "no-cors"})
        document.body.innerHTML = await response.text()
        console.log(await response.text())
    } catch (err) {
        console.log("Fetch Error: " + err)
    }
}
function listMenu(menu){
    let block = document.getElementById("menu")
    block.innerHTML = menu
}