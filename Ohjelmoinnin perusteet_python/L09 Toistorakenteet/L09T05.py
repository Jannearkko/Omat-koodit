# Tehtävä 5

# Tee funktio lotto(), joka arpoo lottorivin seitsemän (7) numeroa väliltä 1-40 ja palauttaa sen muodossa '1,3,5,10,20,33,39'. 
# Käytä lukujen arpomiseen Pythonin valmista modulia random

import random

def lotto():
# tyhjä lista numeroille
    numbers = []
# 7 kertaa jaetaan numero
    for x in range(7):
        number = numbers.append(random.randint(1,40))
        # jos jaettu numero on jo listalla, poista viimeisin
        if number in numbers:
            numbers.pop()
        else:
            pass
    # luo listasta palautus string
    string = ",".join (str(number) for number in numbers)
    # palauta
    return string

print(lotto())




