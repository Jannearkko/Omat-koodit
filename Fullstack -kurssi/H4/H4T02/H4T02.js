async function getHouses() {
    let url = 'https://student.labranet.jamk.fi/~AB3817/fullstack_ttc2080-3014/H4/H4T02/talotiedot.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function renderHouses() {
    let houses = await getHouses();

    let housediv = document.getElementById("talot");

    // poista kaikki lapset aina uudella ajolla.
    housediv.replaceChildren();

        houses.forEach(house => {        

            housecontainer = document.createElement('div');
            housecontainer.className = 'houseContainer';

            let image = document.createElement('img');
            image.src = house.image;
            image.className = 'houseImage';

            let header = document.createElement('p');
            header.className = 'header';
            header.innerHTML = house.address;

            let size = document.createElement("p");
            size.innerHTML = house.size + " m2";

            let kuvaus = document.createElement("p");
            kuvaus.className = "text";
            kuvaus.innerHTML = house.text;

            let price = document.createElement("p");
            price.innerHTML = new Intl.NumberFormat("fi-FI").format(house.price) + " euroa";

            housecontainer.appendChild(image);
            housecontainer.appendChild(header);
            housecontainer.appendChild(size);
            housecontainer.appendChild(kuvaus);
            housecontainer.appendChild(price);

            // muuttujat alapuolen ehtolauseille
            let check = nelio.checked;
            let check1 = hinta.checked;
            let ha = house.price;
            let pinta_ala = house.size;
            // if ehtolauseet jos checkbox true tai false. Lisää container diviin.
            if(check==true && check1==true){
                if (pinta_ala <= 200 && ha < 1000000){
                    housediv.appendChild(housecontainer);
                }
            } else if(check==true && check1==false){
                if (pinta_ala <= 200){
                    housediv.appendChild(housecontainer);
                }
            } else if (check==false && check1==true){
                if (ha < 1000000){
                    housediv.appendChild(housecontainer);
                }
            } else if (check==false && check1==false){
                housediv.appendChild(housecontainer);
            }
        });    
}
renderHouses();