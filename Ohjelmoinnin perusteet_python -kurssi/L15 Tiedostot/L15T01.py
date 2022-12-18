# Tee ohjelma, joka kysyy käyttäjältä henkilöiden sukunimiä ja kirjoita käyttäjän antamat nimet tiedostoon (lopetusehdon voit päättää itse).
# Avaa tämän jälkeen tiedosto lukemista varten ja tulosta konsoliin tiedoston sisältö riveittäin.
# Huomioi mahdolliset poikkeukset, joita tiedoston käsittely voi aiheuttaa.

try:
    sukunimet = "sukunimet.txt"
    file = open(sukunimet, "w")
    name = "placeholder"

    while name != "":
        name = input("Anna sukunimi, Enter lopettaa: ")
        if name != "":
            file.write(name + "\n")
    file.close()
except PermissionError:
    print("Sinulla ei ole oikeutta kirjoittaa tiedostoon.")
try:
    file = open(sukunimet, "r")
    for i in file:
        lines = i.rstrip()
        print(lines)
    file.close()
except PermissionError:
    print("Sinulla ei ole oikeutta lukea kyseistä tiedostoa.")

