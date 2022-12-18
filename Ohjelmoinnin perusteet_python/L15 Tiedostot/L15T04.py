# Tee ohjelma joka kysyy käyttäjältä lukuja (joko kokonaisluku tai liukuluku) ja tallenna kokonaisluvut eri tiedostoon kuin liukuluvut.
# Sovellus tulee lopettaa jos käyttäjä ei syötä kokonais- tai liukulukua.
# Tarkista tiedostojen sisältö tekstieditorilla.

kokonaisluvut = "kokonaisluvut.txt"
desimaaliluvut = "desimaaliluvut.txt"
k_file = open(kokonaisluvut, "w")
d_file = open(desimaaliluvut, "w")
numero = "placeholder"

#counter luvuille
kokonaislukuja = 0
desimaalilukuja = 0
# while looppi joka kysyy lukuja
while numero != "":
    numero = input("Anna kokonaisluku tai desimaaliluku, Enter lopettaa: ")
    try:
        #kokeile ensin muuttaa annettu syöte integeriksi ja jos onnistuu niin kirjoita luku omaan tiedostoon.
        try:
            numero_int = int(numero)
            k_file.write(numero + "\n")
            kokonaislukuja += 1
        # jos ei onnistuu niin muuta floatiksi ja kirjoita luku omaan tiedostoon.
        except:
            numero_float = float(numero)
            d_file.write(numero + "\n")
            desimaalilukuja += 1
        # jos syöte tyhjä tai jokin muu kuin luku niin ratkaise valueerror ja sulje ohjelma.
    except ValueError:
        print("Annoit väärän syötteen tai painoit Enter, ohjelma lopetetaan.")
        print("Annoit yhteensä", kokonaislukuja,"kokonaislukua ja", desimaalilukuja,"desimaalilukua.")

k_file.close()    
d_file.close()



