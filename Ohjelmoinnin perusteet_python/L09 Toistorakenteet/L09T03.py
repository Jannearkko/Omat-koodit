# Tehtävä 3

# Tee ohjelma, joka kysyy ensin käyttäjältä jonkin luvun väliltä 1-10. Tämän jälkeen näytä luvut yhdestä annettuun lukuun ja luvun neliön.

number = int(input("Anna numero väliltä 1-10: "))
for i in range(1, number):
    print("Luvun", i, "neliö on: ", i**2)
print("Luvun", number, "neliö on: ", number**2)