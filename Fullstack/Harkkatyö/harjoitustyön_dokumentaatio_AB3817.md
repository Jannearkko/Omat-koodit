# FullStack-ohjelmointi: Harjoitustyön palautus
28.11.2022  
Arkko Janne [AB3817]


Linkki harjoitustyön dokumentointiin:  
https://gitlab.labranet.jamk.fi/AB3817/fullstack_ttc2080-3014/-/tree/main/Harkkaty%C3%B6  

Linkki harjoitustyön esittelyvideoon Youtubessa:  
https://youtu.be/9dF0tEJLMHs


Oma arvio harjoitustyön korottavasta vaikutuksesta: 2

---
### DOKUMENTAATIO

TEHTÄVÄN KUVAUS:

Rakensin Raspberry Pi:lle Fullstack -sovelluksen, joka hyödyntää RuuviTag -laitteelta saatavaa dataa. Mm. lämpötiladata tallennetaan Raspberry Pi:lla lokaaliin Influx -tietokantaan käyttäen RuuviCollector -ohjelmaa. Palvelimella node.js sovellus hakee ko. dataa influx-queryillä perustuen käyttäjäpuolen fetch-pyyntöihin ja toimittaa sen html-sivulle katseltavaksi. Ulkoisesta tietokannasta (Openweathermap) haetaan myös tämän hetkinen säädata ulkoilmalle.

Sovelluksessa käyttäjä pystyy valitsemaan nähtäväksi joko tämän hetkisen datan tai viimeisen 24h/1h datan graafisessa muodossa.

KÄYTÄNNÖN TOTEUTUS:

![graafi](/Harkkaty%C3%B6/rakenne.png)

Sovellus on rakennettu yllä olevan kuvan mukaisesti. Palvelin, tietokanta ja web-palvelimet pyörivät Raspberry Pi:lla, joka kerää säädataa RuuviTag-laitteelta. Käyttäjälle tarjoillaan apache-palvelimen kautta html-dokumentti ja proxy-serverillä ohjataan fetch-liikenne node.js palvelimelle. Sovellus toimii kokonaisuudessaan sisäverkossa, koska InfluxDB:n asentaminen pilveen olisi maksanut rahaa. Olisin voinut kikkailla proxy-palvelimien kanssa sovelluksen näkyväksi internettiin, mutta Pasin kanssa sähköpostitse keskusteltuamme, sitä ei tarvinnut tehdä.

Sovellus on pääosin rakennettu funktioilla. Luokkarakenteita ei ole käytetty. Tärkeimmät funktion on DOM-puuta muokkaavat funktiot, jotka hakevat datan node.js palvelimelta sekä käsittelevät ja piirtävät datan käyttäjän katseltavaksi. Funktioiden välillä siirtyvät parametrit ovat lähinnä tietokannasta haettuja json-tiedostoja, jotka sisältävät säädatan. Parametrien mukaan tapahtuu html-sivulle piirto.

AJAN KÄYTTÖ:

Aikaa harjoitustyön tekemiseen meni yhteensä noin 20 +- 5 tuntia. Suurimmat vaikeudet olivat datan parsimisessa ja esillepanossa. Muuten DOM-puun muokkaus on aika yksinkertaista puuhaa. 

---
### ITSEARVIO 

VAHVUUDET:

+ Sovellus on kaikilta osin toimiva
+ Käytetty mielestäni laajasti opintojakson aihealueen tekniikoita
+ Käytetty opintojakson ulkopuolista tekniikkaa mm. Chart.js ja InfluxDB
+ Videoesittely kattava, tiivis ja rakenne hyvä
+ Ympäristö rakennettu Raspberry Pi:lle
+ Käytetty ulkopuolista laitteistoa tietokantadatan luomiseen (RuuviTag)
+ Hyödynnetty vielä apache2 -palvelinta proxy-serverinä yhteyden ohjaamiseen.

KEHITETTÄVÄÄ:

+ Käytin ainoastaan GET-reittiä palvelimen päässä. Toisaalta sovelluksen tyyli saneli tätä myös.
+ Front javascript saisi olla selkeämpää. Tuli aika isoja funktioita, jotka saisivat olla tiiviimpiä ja kutsua toisia funktioita eri käyttötarkoituksiin.
+ Palvelimen puoli olisi saanut olla "merkittävämpi". Nyt se on lähinnä tietokantayhteyksiä ja fetch API:a varten.
+ Sivusto ei ole saavutettavissa internetissä vaan vain lokaalina.

HUOMIOITA:

+ Git-repositoriossa olevat tiedostot ovat kopioituja Raspberry Pi:lta, joten palvelin-kansio mm. sisältää vain index.js ja package.json tiedostot, koska ne ovat tärkeimmät, joten en alkanut turhaan jokaista palvelimen tiedostoa lataamaan gittiin.