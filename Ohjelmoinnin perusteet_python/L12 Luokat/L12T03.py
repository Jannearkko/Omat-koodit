# Autotallissasi on kolme autoa. Tee luokka Car. Tee luokalla on kolme ominaisuutta brand, model ja price. Luo Car-luokasta vähintään kolme erilaista auto-oliota. Aseta autojen ominaisuudet seuraavasti:

# brand="Skoda" model="Octavia" price=3000
# brand="Audi" model="A4" price=4000
# brand="Volvo" model="V70" price=5000

# Tulosta kaikkien autotallin kolmen auton ominaisuudet konsolille.
# Laske myös autojen yhteishinta, ja näytä se konsolilla:

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

car1 = Car("Skoda", "Octavia", 3000)
car2 = Car("Audi", "A4", 4000)
car3 = Car("Volvo", "V70", 5000)
car_prices = str(car1.price + car2.price + car3.price)

print("car1:",car1)
print("car2:",car2)
print("car3:",car3)
print("Total price of the cars is", car_prices)