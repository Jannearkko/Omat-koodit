# Tee funktio time, joka muuttaa parametrinä saadun sekuntiarvon muotoon tunnit:minuutit:sekunnit. 
# Esimerkiksi luvulle 10000, palautetaan tieto seuraavassa muodossa "02:46:40"

def time(seconds):
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
      
    return "%02d:%02d:%02d" % (hour, minutes, seconds)
    
print(time(10000))



