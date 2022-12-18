async function getNames(){
    let url = 'https://student.labranet.jamk.fi/~AB3817/fullstack_ttc2080-3014/H4/H4T03/names.json';
    try {
        let result = await fetch(url);
        return await result.json();
    } catch (error){
        console.log(error);
    }
}
window.onload = async function renderNames() { // koko ohjelman sielu ja sydän
    let names = await getNames();
    
    const searchFieldElement = document.getElementById("searchField"); // hae html:stä input kenttä
    let currentLi = 0;
    searchFieldElement.onkeyup = (event) => { //keyup eventti, jolla seurataan syötettä
        switch(event.code){ // switch-case backspacelle ennen while-looppia,jotta lopputulos on hyvä.
            case "Backspace":
                currentLi = 0;
                break;
        }
        let ul = document.getElementById("nimet");
        while(ul.hasChildNodes()){  // poistetaan muutoksien tullessa aina vanhat li elementit
            ul.removeChild(ul.firstChild);
        }

        for (i=0;i < names.length;i++){ // loopataan getNames()
            let name = names[i];
            if (name.toUpperCase().startsWith(searchFieldElement.value.toUpperCase())){ // jos getNames() antaman listan alkio täsmää inputtiin
                if(searchFieldElement.value != 0){
                    let li = document.createElement("li");
                    let text = document.createTextNode(name);
                    li.className = "nimitag";
                    li.appendChild(text);
                    ul.appendChild(li);
                    
                }
            }
        }
        let listNames = document.getElementsByClassName("nimitag");
        listNames[currentLi].classList.add("highlight"); // lisää ensimmäiselle listan alkiolle luokka "highlight"

        switch(event.code){ // toinen switch-case-eventti. Määrittää näppäinten tapahtumat. 
            case "ArrowUp":
                listNames[currentLi].classList.remove("highlight"); // poista edellisen alkion luokka
                currentLi = currentLi > 0 ? --currentLi : 0; // muokkaa muuttujaa currentLi täsmäämään alkioon
                listNames[currentLi].classList.add("highlight"); // anna uudelle alkiolle luokka "highlight"
                break;
            case "ArrowDown":
                listNames[currentLi].classList.remove("highlight");
                if (currentLi < listNames.length-1){
                    currentLi++;
                } else {
                    currentLi = listNames.length-1;
                }
                listNames[currentLi].classList.add("highlight");
                break;
            case "Enter":
                let chosen_li = listNames[currentLi].innerHTML;
                searchFieldElement.value = chosen_li; // enterillä valitun alkion arvo siirty inputin arvoksi
                currentLi = 0; // nollaa laskuri
                while(ul.hasChildNodes()){ // poista alkiot listalta
                    ul.removeChild(ul.firstChild);
                };
                break;
            case "Escape":
                searchFieldElement.value = ""; // tyhjennä input
                currentLi = 0; // nollaa laskuri
                while(ul.hasChildNodes()){ // poista alkiot listalta
                    ul.removeChild(ul.firstChild);
                };
                break;
        }
    }; 
}
