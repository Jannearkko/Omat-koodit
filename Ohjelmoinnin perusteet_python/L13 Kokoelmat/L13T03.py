# Toteuta ohjelma, johon voi tallentaa kymmenen eri auton tiedot. Kustakin autosta tiedetään rekisterinumero (esim ABC-123) 
# ja autonmerkki (esim Skoda). 
# Keksi itse erilaisia rekisterinumeroita ja automerkkejä. Tallenna tiedot valitsemaasi kokoelmaan. 
# Tulosta sen jälkeen autojen tiedot ensin aakkosjärjestyksssä automerkin mukaan, ja sen jälkeen aakkosjärjestyksessä rekisterinumeron mukaan.

cars = [
    "Skoda",
    "Toyota",
    "Ford",
    "Mercedez-Bens",
    "BMW",
    "Lada",
    "Opel",
    "Audi",
    "Tesla",
    "VW",
]
reg_nums = [
    "CBC-123",
    "ASD-123",
    "DFD-462",
    "EIR-653",
    "OKD-913",
    "JUH-153",
    "PSK-457",
    "HEN-634",
    "HNM-139",
    "BNI-912",
]
# muodosta lista "stack" tupleista, joissa aina cars ja reg_nums -listojen samat indeksit (indeksit 0 ja 0 muodostaa yhden tuplen)
stack = list(zip(cars, reg_nums))
# sorttaa stack ensimmäisen tuplen 0 indeksin mukaan (saadaan aakkosittain auton merkin mukaan)
stack.sort(key=lambda tup:tup[0])
print("Aakkosittain auton merkin mukaan:\n")
for i in stack:
    print(i[0]+" "+i[1])

print("\n")
print("Ja aakkosittain rekisterinumeron mukaan:\n")
# sorttaa stack uudelleen ensimmäisen tuplen 1 indeksin mukaan (saadaan aakkosittain rekisterinumeron mukaan)
stack.sort(key=lambda tup:tup[1])
for i in stack:
    print(i[0]+" "+i[1])




