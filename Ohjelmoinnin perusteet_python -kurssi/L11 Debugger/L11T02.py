# Tee funktiot: celToFah ja fahToCel
# Funktiot ottavat parametrikseen asteluvun ja muuttavat sen joko fahrenheitit celsiuksiksi tai celsius-asteet fahrenheitiksi. 
# Muutettu astearvo palautetaan yhden desimaalin tarkkuudella.
# Testaa kumpikin funktio kutsumalla sitä käyttäjän antamilla luvuilla.
# Esimerkiksi testi print(celToFah(10.0)) palauttaa arvon 50.0

#Celsius = (Fahrenheit – 32) * 5/9
#Fahrenheit = (Celsius * 9/5) + 32


def celToFah(cel):
    fahrenheit = (cel * 1.8 + 32)
    return float(round(fahrenheit, 1))

print(celToFah(float(input("Anna celsius: "))))

def fahToCel(fah):
    celsius = (fah - 32) * 5/9
    return float(round(celsius, 1))

print(fahToCel(float(input("Anna fahrenheit: "))))




