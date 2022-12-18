# Tee edellisen tehtävän Car-luokkaa apuna käyttäen seuraava: 
# luo satunnaisesti vähintään viisi erilaista auto-oliota seuraavista automerkeistä (brand) 
# 'Audi', 'BMW', 'Ford', 'Opel', 'Skoda', 'Volvo' ja 'VW'. Autojen model-ominaisuuden voit jättää halutessasi tyhjäksi. 
# Generoi satunnaisesti niille hinta väliltä 1000-10000. Lisää luodut auto-oliot cars-nimiseen list-rakenteeseen. 
# Huom! Käytä apuna randint-funktiota satunnaisuuden toteuttamisessa.

import random

class Car:
    def __init__(self, brand="", model="", price=0):
        self.brand = brand
        self.model = model
        self.price = price
    def __str__(self):
        return self.brand + " " + self.model + " " + str(self.price)

    brand = ""
    model = ""
    price = 0

brands = ['Audi','BMW','Ford','Opel','Skoda','Volvo','VW']

models_audi = ['A1','A2','A3','A4','A5']
models_bmw = ['M1','M2','M3','M5','X3','X5']
models_ford = ['Fiesta','Focus','Escort','Kuga','Mondeo']
models_opel = ['Insignia','Grandland','Astra','Corsa','Mocca']
models_skoda = ['Octavia','Superb','Yeti','Fabia','Rabid','Scala']
models_volvo = ['V40','V50','V60','V70','V90','S70','S90']
models_vw = ['Golf','Passat','Scirocco','Polo','Transporter','Caravelle']

# satunnaisesti tuotettujen autojen lista
cars = []
# luo viisi eri autoa listalta
for i in range(5):
    # lista, josta autot luodaan
    for i in brands:
        # valitse satunnainen auto listalta
        brand = random.choice(brands)

        # luo autolle satunnainen hinta
        price = random.randint(1000,10000)

        # jos tietty merkki niin lisää satunnainen malli listalta
        if brand == "Volvo":
            model = random.choice(models_volvo)
        if brand == "Audi":
            model = random.choice(models_audi)
        if brand == "BMW":
            model = random.choice(models_bmw)
        if brand == "Ford":
            model = random.choice(models_ford)
        if brand == "Opel":
            model = random.choice(models_opel)
        if brand == "Skoda":
            model = random.choice(models_skoda)
        if brand == "VW":
            model = random.choice(models_vw)

    # syötä auton tiedot luokalle Car
    car = Car(brand, model, price)

    # lisää auton tiedot listalle cars
    cars.append(str(car))

# printtaa lista
print("\n".join(cars))
