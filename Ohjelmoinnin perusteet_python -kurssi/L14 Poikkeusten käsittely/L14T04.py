# Tee kokoelma, jossa on 5 merkkijonoa.
# Kysy käyttäjältä indeksi mihin kohtaan taulukkoa käyttäjä haluaa syöttää uuden tekstin.
# Kysy käyttäjältä uusi teksti ja laita se taulukkoon käyttäjän antamaan indeksiin.
# Tulosta taulukon sisältö.
# Korjaa ohjelma niin ettei se kaadu, jos käyttäjä syöttää indeksin, joka on taulukon ulkopuolella.
# Kerro käyttäjälle mikäli indeksi ei ole kelvollinen ja pyydä syöttämään se uudestaan.

kokoelma = ["Yksi",
            "Kaksi",
            "Kolme",
            "Neljä",
            "Viisi"]

print("\nNykyinen lista:")
print(", ".join(kokoelma),"\n")

def lisaa_kokoelmaan(new_index, new_text):
    kokoelma[new_index] = new_text
    print("\nUusi lista:")
    print(", ".join(kokoelma))

while True:
    new_index = int(input(f"Mihin kohtaan listaa haluat lisätä uuden tiedon välillä 0 - {len(kokoelma) - 1}? "))
    new_text = input("Anna uusi syötettävä teksti: ")
    try:
        lisaa_kokoelmaan(new_index, new_text)
        break
    except IndexError:
        print("Antamasi indeksi on taulukon ulkopuolella.")
        continue
    
    

