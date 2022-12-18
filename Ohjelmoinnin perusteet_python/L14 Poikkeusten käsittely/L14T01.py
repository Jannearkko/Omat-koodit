# Tee ohjelma, jossa yrität muuttaa listan sellaista arvoa, jota ei ole olemassa. 
# Alusta siis lista, jossa on neljä elementtiä ja sen jälkeen yritä muuttaa viidettä elementtiä. 
# Tarkista millaisen poikkeuksen saat.
# Korjaa ohjelma niin ettei se kaadu.

try:
    lista = ["a","b","c","d"]
    lisaa = input("Anna kirjain: ")
    lista.append(lista[5](lisaa))
except IndexError:
    print("Ei voi lisätä kirjainta, indeksiä ei ole olemassa")


