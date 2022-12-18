# Tehtävä A
# Toteuta ohjelma, joka kysyy käyttäjältä autojen rekisterinumeroita (siis esim 'ABC-123' jne) ja tallentaa ne listaan. 
# Käyttäjä voi syöttää niin monta rekisterinumeroa kuin haluaa, syöttäminen lopetetaan tyhjällä syötteellä. 
# Näytä syötetyt rekisterinumero aakkosjärjestyksessä.

# lista numeroille
rekisterinumerot = []
rek_num = "eiole"
# while looppi käyttäjän antamille numeroille
while rek_num != "":
    rek_num = input("Anna rekisterinumero, tyhjä lopettaa: ")
    if rek_num !="":
        # lisää numero listaan jos annettu numero
        rekisterinumerot.append(rek_num)
# järjestä numerot aakkosjärjestykseen
rekisterinumerot.sort()
# for looppi printtaa numerot allekkain
for rek_num in rekisterinumerot:
    print(rek_num)
