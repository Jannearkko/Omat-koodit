# Luo jollakin editorilla (esim Notepadilla) tekstitiedosto 'nimet.txt', johon lisäät vähintään kymmenen naisten ja kymmenen miesten etunimeä.
# Tee ohjelma, joka lukee em. tekstitiedostosta nimet ja kertoo montako nimeä löytyy ja montako kertaa kukin nimi esiintyy.
# Huomioi myös muut mahdolliset poikkeukset joita tiedoston käsittely voi aiheuttaa.

# montako riviä tiedostossa
try:
    line_count = 0
    file = open("nimet.txt", "r")
    for line in file:
        # jos rivillä ei rivinvaihtoa, lisää yksi line_counttiin
        if line != "\n":
            line_count += 1
        # poista turhan rivinvaihdot
        print(line.rstrip())
    # printtaa nimien lukumäärä
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
except FileNotFoundError:
    print("Kyseistä tiedostoa ei löydy tai sitä ei ole olemassa")


