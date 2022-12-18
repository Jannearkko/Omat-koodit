# Tee ohjelma, joka arpoo lottorivin ja tallentaa ne tekstitiedostoon 'lotto.txt'.
# Arvottu rivi sisältää seitsemän (7) numeroa väliltä 1-40. Varmista arpoessasi riviä että sama numero ei voi esiintyä kahta kertaa.

import random
# luo lotto.txt
lotto_f = "lotto.txt"
# avaa lotto.txt appendoivana
file = open(lotto_f, "a")

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
    # tallenna tulos lotto.txt
    file.write(string + "\n")
    # palauta
    return string

print(lotto())
# sulje lotto.txt
file.close()