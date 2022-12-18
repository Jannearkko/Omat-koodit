# Funktio esitellään Python kielessä def varatulla sanalla. 
# def sanan jälkeen tulee ohjelmoijan päättämä funktion nimi ja sen jälkeen suluissa funktion parametrit, 
# tai vain tyhjät sulut mikäli funktiolle ei viedä parametrejä. Funktion esittely päättyy kaksoispisteeseen :. 
# Esittelyä seuraa funktion toteutus joka täytyy sisentää eteenpäin neljän välilyönnin verran. 
# VS Code osaa tehdä sisennyksen TAB näppäimen painalluksella.

from helper import *

def print_info():
    print("Info")

# Funktiot voivat myös palauttaa arvon joka voidaan sijoittaa muuttujaan. 
# Funktio palauttaa arvon return varatun sanan avulla ja palautettu arvo sijoitetaan muuttujaan = operaattorilla funktiokutsun yhteydessä.

def print_and_return_number():
    print("Info - returning 123")
    return 123

number = print_and_return_number()
print("print_and_return_number returned ", number)

# Seuraavaksi esitellään funktio jolle viedään parametreja ja se palauttaa arvon. 
# Parametrit esitellään funktion nimen jälkeen sulkujen sisällä ja erotellaan pilkuilla.

def sum(number1, number2):
    return number1 + number2

number = sum(5, 11)
print("sum returned ", number)

# Python kielessä perustietotyypit kuten numerot ja merkkijonot viedään funktioparamerinä kopioina alkuperäisestä. 
# Tämä tarkoittaa sitä että funktio käsittelee omia kopioitaan eikä muokkaa argumenttina lähetetyn muuttujan sisältöä. 
# Kokeillaan tätä, lisätään uusi funktio modify_text:

# define a function that takes text as a parameter and modifies
# it before printing
def modify_text(text):
    text += ", this text is added by function"
    print(text)

# Ja lisätään kutsu modify_text funktioon:

text = "About to call modify_text"
modify_text(text)
print(text)

# Lisää seuraava rivi functions.py tiedoston alkuun. 
# Tämä rivi kertoo että haluamme ottaa käyttää kaikkia (*) helper.py tiedostossa esiteltyjä tietoja.
# Vaihtoehtoisesti voit määritellä yksittäisen funktion joka otetaan mukaan:
# from helper import sub

number = sub(5, 11)
print("sub returned ", number)
