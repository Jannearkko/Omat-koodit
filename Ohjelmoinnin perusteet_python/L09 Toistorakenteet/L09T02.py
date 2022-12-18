# Tehtävä 2

# Tee ohjelma, joka kysyy käyttäjältä kokonaislukuja. Lukuja kysytään siihen saakka kunnes käyttäjä antaa tyhjän syötteen. 
# Laske kuinka monta lukua käyttäjä antoi, laske myös annettujen lukujen summa. 
# Näytä annettujen lukujen lukumäärä ja summa käyttäjälle.

value = 0
lukumaara = 0

while True:
    number = input("Anna luku: ")
    if number == "":
        break
    if int(number) > 0:
        value += int(number)
        lukumaara += 1
print("Lukuja annettu:", lukumaara)
print("Sum is", value)