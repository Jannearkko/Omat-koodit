# Tee funktio calc_consumption. Sinne viedään parametreina:

# auton kulutus litraa/100km
# polttoaineen hinta euroa per litra
# kuljettu matka kilometreinä.

# calc_consumption-funktio palauttaa tietoina kuinka monta litraa polttoainetta on kulunut matkalla sekä polttoaineeseen kuluneen rahan määrän. 
# Kysy käyttäjältä: kulutus, polttoaineen hinta ja kuljettu matka. Sen jälkeen kutsu calc_consumption-funktiota ohjelmasta. 
# Tarkista että funktio laskee kulutuksen ja polttoaineen hinnan oikein.



def calc_consumption(matka, polttoaineenhinta, kulutus):
    fueltotal = matka*(kulutus/100)
    costtotal = fueltotal*polttoaineenhinta
    print("Fuel:","{:.2f}".format(fueltotal),"liter")
    print("Cost:","{:.2f}".format(costtotal), "€")

matka = float(input("Enter trip length in km:"))
polttoaineenhinta = float(input("Enter fuel price/liter:"))
kulutus = float(input("Enter fuel consumption/100 km:"))

calc_consumption(matka,polttoaineenhinta,kulutus)

