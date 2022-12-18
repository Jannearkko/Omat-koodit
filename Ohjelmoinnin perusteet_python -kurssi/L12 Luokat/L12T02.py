# Tee luokka Cat. Tee Cat-luokalle kaksi ominaisuutta name ja color, sekä yksi metodi miau. Luo Cat-luokasta kaksi erilaista kissa-oliota seuraavilla tiedoilla:
# name: Kit, color: black
# name: Kat, color: white
# Kissat sanovat naukuessaan: Meoooooow!
# Näytä kissa-olioiden ominaisuudet konsolille, laita kissat myös naukumaan:

class Cat:
    def __init__(self, name="", color=""):
        self.name = name
        self.color = color
    def __str__(self):
        return self.name + ", " + "Color:" + self.color
    
    def miau():
        return "Meoooooow!"
    
    name = ""
    color = ""

kit = Cat("Kit", " black")
kat = Cat("Kat", " white")

print(kit)
print(kat)
print("Kit says:",Cat.miau())
print("Kat says:",Cat.miau())
