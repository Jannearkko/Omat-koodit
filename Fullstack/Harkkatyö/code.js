
function init() { // init funktio. Alustetaan käyttöliittymä.
    document.getElementById("now").style.visibility="visible"
    document.getElementById("charts").style.visibility="hidden"
    document.getElementById("ka").style.visibility="hidden"
    loadNow()
    loadOut()
}
async function load24h() { // fetch -funktio
    let response = await fetch("http://192.168.8.3:3001/24")
    let datas = await response.json()
    showCharts(datas) // kutsutaan showCharts
}
async function loadNow() { // fetch -funktio
    let response = await fetch("http://192.168.8.3:3001/now")
    let datas = await response.json()
    showNow(datas) // kutsutaan showNow
}
async function loadOut() { // fetch openweathermapista paikallinen sää
    var API_KEY = "51f4603ab225e1e678ba28ff7a331e01"
    var latitude = 62.376190;
    var longitude = 25.564570;
    var url = `http://api.openweathermap.org/data/2.5/weather?`+`lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    let data_out = await fetch(url).then(data => {return data.json()})
    showOut(data_out) //työnnä data showOut-funktioon
}
function clock(){ // käyttöliittymän kello
    function addZero(i){
        if (i < 10){i = "0" + i}
        return i;
    }
    let str = ""
    let date_str = ""
    let now = new Date()
    // kello
    str += addZero(now.getHours()) +":"+addZero(now.getMinutes())+":"+addZero(now.getSeconds());
    document.getElementById("upperclock").innerHTML = str
    // pvm
    let months = ["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    let cur_month = now.getMonth() -1
    let cur_day = now.getDay()

    let disp_month = months[cur_month]
    let disp_weekday = days[cur_day]
    let disp_day = now.getDate()
    date_str += disp_month +" "+ disp_day + ", "+disp_weekday

    document.getElementById("current_date").innerHTML = date_str
}

setInterval(clock, 1000); // reaaliaikaisen kellon päivitys

function showOut(data_out) { //ulkoilman lämpötila-funktio
    let temp = document.getElementById("temp_now_outside")
    let hum = document.getElementById("hum_now_outside")
    let pres = document.getElementById("pres_now_outside")
    let c_or_f = document.getElementById("slider")
    let rounded_temp = Math.round(data_out.main.temp - 273.15)
    if (c_or_f.style.left === "65px"){
        temp.innerHTML = Math.round(rounded_temp*1.8 + 32) + "°F"
    } else {
        temp.innerHTML = Math.round(data_out.main.temp - 273.15) + "°C"
    }
    hum.innerHTML = Math.round(data_out.main.humidity) + "%"
    pres.innerHTML = Math.round(data_out.main.pressure) +"hPa"
}
function showNow(datas) { // Now
    document.getElementById("nav_1").style.textDecoration="underline"
    document.getElementById("nav_2").style.textDecoration="none"

    let temp = document.getElementById("temp_now")
    let hum = document.getElementById("hum_now")
    let pres = document.getElementById("pres_now")

    let time_array = []
    let temp_array = []
    let hum_array = []
    let pres_array = []

    datas.forEach(data => {
        let timestamp = Date.parse(data.time) // muutetaan aikaleima unix muotoon
        timestamp += 10800 // lisätään 3h unix aikaan
        let timestamp_2 = new Date(timestamp) // muutetaan unix aika takaisin Datetime
        // parsitaan Datetime-formaattia hieman...
        let day = timestamp_2.getDate();
        let month = timestamp_2.getMonth() +1;
        let year = timestamp_2.getFullYear();
        let hours = timestamp_2.getHours();
        let minutes = timestamp_2.getMinutes();
        let seconds = timestamp_2.getSeconds();
        let currentDate = `${day}.${month}.${year}`
        let currentTime = `${hours}:${minutes}:${seconds}`
        let datetime = currentDate + " " + currentTime

        time_array.push(datetime)
        if (data.temperature != null){
            temp_array.push(data.temperature)
        }
        if (data.humidity != null){
            hum_array.push(data.humidity)
        }
        if(data.pressure != null){
            pres_array.push(data.pressure)
        }
    })
    let rounded_temp = Math.round(temp_array[0])
    let rounded_hum = Math.round(hum_array[0])
    let pressure = Math.round(pres_array[0]/100)
    let c_or_f = document.getElementById("slider")
    if (c_or_f.style.left === "65px"){
        temp.innerHTML = Math.round(rounded_temp*1.8 + 32) + "°F"
    } else {
        temp.innerHTML = rounded_temp + "°C"
    }
    hum.innerHTML = rounded_hum + "%"
    pres.innerHTML = pressure +"hPa"
}

function showCharts(datas){ // 24h
    document.getElementById("now").style.visibility="hidden"
    document.getElementById("ka").style.visibility="visible"
    document.getElementById("charts").style.visibility="visible"

    document.getElementById("nav_2").style.textDecoration="underline"
    document.getElementById("nav_1").style.textDecoration="none"

    let time_array = []
    let temp_array = []
    let temp_array_med = []
    
    // käydään time-tietueet läpi ja pusketaan arrayhin
    datas.forEach(data =>{
        let timestamp = Date.parse(data.time) // muutetaan aikaleima unix muotoon
        timestamp += 10800 // lisätään 3h unix aikaan
        let timestamp_2 = new Date(timestamp) // muutetaan unix aika takaisin Datetime
        // parsitaan Datetime-formaattia hieman...
        let day = timestamp_2.getDate();
        let month = timestamp_2.getMonth() +1;
        let year = timestamp_2.getFullYear();
        let hours = timestamp_2.getHours();
        let minutes = timestamp_2.getMinutes();
        let seconds = timestamp_2.getSeconds();
        let currentDate = `${day}.${month}.${year}`
        let currentTime = `${hours}:${minutes}:${seconds}`
        let datetime = currentDate + " " + currentTime

        // pushataan lopusi aikamuuttuja time_arrayhin
        time_array.push(datetime)
    })
    // käydään lämpötila-tietueet läpi ja pusketaan temp_arrayhin
    datas.forEach(data => {
        temp_array.push(data.temperature)
    })

    calcMed(temp_array) //calcMed-funktion kutsu

    // kaavio 
    let charts = document.getElementById("charts")
    new Chart(charts, {
        type: "line",
        data: {
            labels: [24,"","","","",18,"","","","","",12,"","","","","",6,"","","","","Now"],
            datasets: [{
                label: "Temperature 24h",
            data: temp_array_med,
            borderColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 1,
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            fill: true,
            responsive: true,
            }]
        },
        options:{
            legend:{
                labels:{
                    fontColor:"white"
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor:"white"
                    },
                    gridLines: {
                        display:false
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor:"white"
                    },
                    gridLines: {
                        display:false
                    }
                }]
            }
        },
    })

    function add(accumulator, a) { //muuttujien alkioiden summaamisfunktio
        return accumulator + a;
    }

    // 24 tunnin keskiarvon laskuri
    let i_24 = temp_array.length
    let sum = temp_array.reduce(add,0)

    let avg_24 = (sum / i_24).toFixed(2)
    document.getElementById("ka24").innerHTML = avg_24 + " °C"

    // 1 tunnin keskiarvon laskuri
    let i_1 = i_24 / 24
    let first_1h = temp_array.slice(0,i_1)
    let sum_1 = first_1h.reduce(add,0)
    let avg_1h = (sum_1 / i_1).toFixed(2)
    document.getElementById("ka1").innerHTML = avg_1h + " °C"

    function calcMed(a){ //24h käppyrän datapisteiden laskentafunktio

        let leng = Math.round(a.length/24)

        let sum = 0
        let i = 0
        a.forEach(data => {
            if (i == leng) {
                temp_array_med.push((sum/i).toFixed(2))
                sum = 0
                i = 0
            } else {
                sum += data
                i++
            }
        })
        
    }

}
function switch_cf(){ //liukukytkimen C <-> F funktio
    let slider = document.getElementById("slider")
    let sliderbar = document.getElementById("slidebar_temp")
    if (slider.style.left === "2px"){
        slider.style.left = "65px"
        sliderbar.style.background = "linear-gradient(90deg, rgba(149, 241, 134, 0) 0%, #33E017 100%)"
        let tempnow = document.getElementById("temp_now").innerHTML
        let tempnowout = document.getElementById("temp_now_outside").innerHTML
        let tempOutToF = 0
        if (isNaN(tempnowout[0])){ //jos ulkolämpötila negatiivinen
            tempOutToF += (tempnowout[1]*-1)*1.8 + 32

        } else {
            tempOutToF += tempnowout[0]*1.8 + 32
        }
        
        let tempInC = tempnow[0]+tempnow[1]
        let tempToF = Math.round(tempInC*1.8 + 32)
        document.getElementById("temp_now").innerHTML = tempToF + "°F"
        document.getElementById("temp_now_outside").innerHTML = tempOutToF + "°F"
    } else {
        slider.style.left = "2px"
        sliderbar.style.background = "linear-gradient(90deg, #33E017 0%, rgba(149, 241, 134, 0) 100%)"
        loadNow()
        loadOut()
    }
}



