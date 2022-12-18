# Tee ohjelma, jolla yrität lukea Windows-koneella kaikki tiedostot kovalevyn C:n juuresta 
# (macOS/Linux/Unix- koneilla yritä lukea käyttäjän juurihakemisto). Näytä tiedostot konsolilla. 
# Koeta sen jälkeen lisätä tiedosto 'ayho.txt' C:n juureen (macOS/Linux/Unix -koneilla käyttäjän juurihakemistoon).
# Mitä tapahtui? Korjaa ohjelma niin, ettei se kaadu.

import os
from time import sleep

tiedot = os.listdir("C:")
for i in tiedot:
    print(i)

try:
    print("\nYritetään lisätä tiedostoa 'ayho.txt' C:n juureen...")
    sleep(4)
    f = open("C:/ayho.txt", "w")
    print("Tiedoston lisäys onnistui!")
except PermissionError:
    print("Sinulla ei ole käyttöoikeutta lisätä tiedostoa!")

# Bonuskysymys: Voit lisätä macOS/linux/unix koneilla tiedoston juureen käyttöoikeuksilla "rwx" juurikansioon ja jos olet superuser -ryhmän jäsen,
# voit aina käyttää "sudo" mahtikomentoa jolloin saat kaikki superuserin oikeudet käyttöön.

