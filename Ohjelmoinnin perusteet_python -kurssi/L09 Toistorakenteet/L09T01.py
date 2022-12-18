# Tehtävä 1

# Tee ohjelma, joka kysyy käyttäjältä viikon kunkin päivän sademäärän. 
# Sademäärä annetaan kokonaislukuna, jollei kyseisenä päivänä ole satanut käyttäjä antaa luvuksi 0. Laske ja näytä viikon kokonaissademäärä.

value= 0
for _ in range(7):
    numero = int(input('Insert number (rainfall): '))
    if numero > 0:
        value+= numero
print('Rainfall sum is', value)