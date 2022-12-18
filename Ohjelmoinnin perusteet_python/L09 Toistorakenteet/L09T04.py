# Tehtävä 4

# Tee ohjelma, joka kysyy käyttäjältä käyttäjän etu ja sukunimen. 
# Tulosta käyttäjän etunimen ensimmäistä kirjainta niin monta kertaa kun etunimessä on kirjaimia. 
# Tämän jälkeen tulosta käyttäjän sukunimi käänteisessä järjestyksessä.

firstname = input("Anna etunimi: ")
lastname = input("Anna sukunimi: ")

for c in firstname:
    first_character = firstname[0]
    print(first_character, end="")

print("", lastname[::-1], end="")