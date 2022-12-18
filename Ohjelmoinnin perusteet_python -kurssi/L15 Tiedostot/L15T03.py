# Jatkoa edelliseen. Lajittele nimet aakkosjärjestykseen ennen tulostusta.

# montako riviä tiedostossa
line_count = 0
file = open("nimet.txt", "r")
# lue sisältö listaan
list_of_names = file.readlines()
# sorttaa lista
list_of_names.sort()
# indeksiä kohti lisää +1 countteriin, tulosta indeksi ja poista rivinvaihdot ja tyhjä tila indeksien välistä.
for i in list_of_names:
    line_count += 1
    print(i.rstrip())
print("\nListassasi on", line_count, "nimeä.\n")

file.close()

file = open("nimet.txt", "r")
# luo dictionary
nimet = dict()
for line in file:
    # älä ota huomioon tyhjiä rivinvaihtoja
    if line != "\n":
        # poista rivinvaihdot
        line = line.strip()
       # splittaa sanakirja yksittäisiksi nimiksi
        names = line.split(" ")
        for word in names:
            # jos nimi jo kertaalleen nimet -dictrionaryssa:
            if word in nimet:
                # lisää yksi avaimen arvoksi
                nimet[word] = nimet[word] + 1
            else:
                # jos nimi vain kertaalleen listalla, avaimen arvo pysyy 1.
                nimet[word] = 1
# printtaa jokainen avain ja sen arvo.
print("Montako samaa nimeä esiintyy listalla:\n")
for key in list(nimet.keys()):
    print(key,":", nimet[key])
file.close()
