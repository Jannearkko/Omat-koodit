# Ehtorakenteiden avulla voidaan valita mitä koodia suoritetaan tai jätetään suorittamatta. Ehtolauseissa käytetään varattua sanaa if, jossa muodostuu lause joka on aina joko tosi tai epätosi (boolean). 
# Mikäli ehtolause on tosi, sen jälkeinen sisennetty koodiblokki suoritetaan.
number = int(input("Gimme a number: "))
if number == 10:
    print("number is 10")

# if ehtolausetta voidaan jatkaa elif– ja else rakenteilla:
number = int(input("Gimme a number: "))
if number == 10:
    print("number is 10")
elif number < 10:
    print("Number is less than 10")
elif number >= 20:
    print("Number is greater or equal than 20")
else:
    print("Number is in between 11 and 19")

# Mikäli ehtolause suorittaa vain yhden rivin, sen voi kirjoittaa myös lyhyemmin yhdelle riville:
number = int(input("Gimme a number: "))
if number == 10: print("number is 10")

# Useampia ehtolauseita voi yhdistää samaan ehtoon käyttämällä operaattoreita ja, tai (and, or).
# Yhdistelmiä voi laittaa yhteen ehtolauseeseen niin monta kun haluaa, mutta ole varovainen ettei ehtolauseesi ole liian monimutkainen
# sen ymmärtämiseksi. Yhdistelmien suoritusjärjestystä voi myös muuttaa laittamalla ne sulkuihin.
# use and & or operators within conditions
number = int(input("Gimme another number: "))
if number > 0 and number < 10:
    print("number is in between 1 and 9")
elif number >= 10 or number == 0:
    print("number is 10 or greater, or number is 0")

# Ehtolauseen täytyy suorittaa vähintään yksi rivi koodia. Mikäli jostain syystä haluat että ehtolause ei suorita mitään, 
# voit käyttää pass varattua sanaa:
number1 = 4
number2 = 43
if number1 > number2:
    pass
