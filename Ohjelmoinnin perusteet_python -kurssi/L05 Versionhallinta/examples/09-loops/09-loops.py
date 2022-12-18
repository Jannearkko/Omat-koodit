# examples of loops

# while silmukka on yksinkertainen toistorakenne jota suoritetaan niin kauan kun sen ehtolause on tosi.
number = 10
while number >= 0:
    print(number)
    number -= 1

# Huomaa että toistorakenteiden ehtolauseena voi käyttää mitä tahansa ehtolausetta, mukaanlukien yhdistämisiä and- ja or operaattoreilla.
number = 5
while number >= 0 and number < 100:
    print(number)
    number -= 1

# for-silmukkaa käytetään käymään läpi haluttu sekvenssi joka voi olla lista, tuple, sanakirja, joukko tai merkkijono.
# Python kielen for silmukka on yksinkertaisempi kuin muiden ohjelmointikielten ja toimii kuin iteraattorimenetelmä muissa olio-ohjelmointikielissä.
# for-silmukan avulla voimme suorittaa joukon lauseita, kerran jokaiselle listan, tuplen jne. kohteelle.
for i in range(5,10,2):
    print("Looping range(10):", i)

# rangelle voi myös määrittää erikseen lähtö- ja loppuarvo:
for i in range(5, 10):
    print("Looping range(5,10):", i)

# for silmukalla voi käydä läpi merkkijonon merkit:
for c in "Basics of programming with Python":
    print(c)

# Ja for silmukalla voi käydä läpi listamuuttujan elementtejä. Tuple- muuttujien läpikäynti toimii samalla tavalla:
names = [ "John", "Cherry", "Jack" ]
for name in names:
    print(name)

# while ja for toistolauseiden sisällä on mahdollista käyttää break ja continue kontrollilauseita.

# use of break and continue
print("Running a while loop with break and continue")
number = 0
while True:
    number = int(input("Enter a number (0 to exit, 100 ignored) "))
    if number == 0:
        # use break to jump out of the loop without checking its condition
        # the rest of the code after 'break' is not executed
        break
    elif number == 100:
        print("Ignored")
        # use continue to jump back to to beginning of the loop without
        # executing the rest of the code in loop
        continue

    print("You entered: ", number)



