# Tehtävä A
# Tee ohjelma joka kysyy käyttäjältä kurssien arvosanoja 
# (arvosana on kokonaisuluku 0,1,2,3,4 tai 5) ja tallentaa ne listaan. 
# Käyttäjä voi syöttää niin monta kurssiarvosanaa kuin haluaa, 
# syöttäminen lopetetaan tyhjällä syötteellä. Näytä lopuksi montako arvosanaa käyttäjä antoi ja 
# arvosanojen keskiarvo.

arvosanat = 0
lukumaara = 0

# looppi arvosanoille
while True:
    arvosana = input("Anna arvosana 1-5, tyhjä lopettaa: ")
    if arvosana == "":
        break
    if int(arvosana) > -1:
        arvosanat += int(arvosana)
        lukumaara += 1
# keskiarvomuuttuja
keskiarvo = arvosanat / int(lukumaara)
print("Arvosanoja annettu: ",lukumaara)
print("Arvosanojesi keskiarvo on: ", round(keskiarvo,1))
if keskiarvo > 4.5:
    print("Keskiarvosi on erinomainen!")
elif keskiarvo > 3.5:
    print("Keskiarvosi on kiitettävä!")
elif keskiarvo > 2.5:
    print("Keskiarvosi on hyvä!")
elif keskiarvo > 1.5:
    print("Keskiarvosi on tyydyttävä!")
elif keskiarvo >= 1:
    print("Keskiarvosi on huono!")
else:
    print("Hylätty. Ei muuta kuin koulun penkille takaisin.")
