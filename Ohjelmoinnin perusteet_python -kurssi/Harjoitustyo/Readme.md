# Password-Maker Pro 3000
## Harjoitustyö
### Janne Arkko, AB3817

Tässä harjoitustyössä lähdin rakentamaan salasanan luontityökalua. 

Suunnittelussa lähdin liikkeelle siitä, että teen ohjelmalle graafisen käyttöliittymän ja päädyin käyttämään tkinter -kirjastoa, sen helpolta vaikuttavan syntaxin mukaan. Suunnitelma oli luoda työkalu, joka kysyy käyttäjältä palvelun, johon haluaa luoda salasanan, sen jälkeen salasanan pituuden ja lopuksi luo satunnaisen salasanan tietystä sarjasta kirjaimia ja numeroita. Ohjelma skannaa käyttäjän tallennusmediat ja listaa ne valikkoon. Päädyin määrittelemään käyttöön ASCII -taulukon sekä siitä vain kaikki kirjaimet ja numerot, jotta luotu salasana on varmasti käyttökelpoinen useimmissa palveluissa ja sovelluksissa. Salasanan luonnin jälkeen ohjelma tallentaa salasanan erilliselle 'password.txt' tekstitiedostolle, annetun palvelun kanssa, käyttäjän valitsemaan tallennusmediaan.

Ohjelma on rakennettu funktioilla, muuttujilla ja kirjastoilla. Luokkarakenteita ei ole käytetty. Funktioiden nimeämisessä yritin olla mahdollisimman selkeä vaikka teinkin sen englanniksi. Kommentteja laitoin reilusti, jotta varmasti välittyy se mitä minkäkin osan kuuluu tehdä.

Ohjelma käsittelee poikkeukset try and except -metodilla. Ohjelmassa voi esiintyä ValueError, TypeError, FileNotFoundError tai PermissionError ja ohjelma antaa käyttäjälle selkeästi tiedon näistä poikkeuksista. Ohjelmassa on info -ruutu, jossa kerrotaan ohjeet käyttöön sekä miten ohjelma luo salasanan. Vinkki -ruudussa on vielä tarkempaa tietoa tallennusmedian valinnasta. 

Tein ohjelmasta "onefile" .exe sovelluksen, jonka jaoin käyttäjäkokemuksien saamiseksi ystävilleni. Ohjelma toimi kuten pitää ja käyttäjät olivat tyytyväisiä lopputulokseen. Palautteessa tuli selkeästi ilmi, että ohjelma voisi myös encryptata luodun tiedoston valmiiksi. Vaikka se ei iso ja vaikea homma olisikaan niin päädyin kuitenkin siihen, että en sitä tähän harjoitustyöhön nyt tee. Ehkä myöhemmin. 

Harjoitustyö itsessään oli äärimmäisen motivoiva ja opettava kun pääsee oikeasti out-of-the-box ja pähkäilemään eri asioita ja niiden vuorovaikutusta ja "oikeasti" oppimaan koodaamista pyyttonilla. Tällä hetkellä minulla on myös liuta muita projekteja päällä mm. harjoituspäiväkirja, johon sitten pyrin käyttämään olioita luomaan käyttäjän valintojen perusteella uusia kokonaisuuksia, jotka lopulta sitten voi tallentaa johonkin ja josta ne sitten voi noutaa esimerkiksi yhteenvetona vaikkapa jostain tietystä harjoitteesta tai kaikkien harjoitteiden kokonaistuntimäärästä tai kuljetusta matkasta.