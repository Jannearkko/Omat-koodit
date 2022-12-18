# Toteuta funktio isthiszero(num). Funktiolla välitetään yksi parametri. 
# Funktio palauttaa true jos parametrin arvo on nolla. 
# Funktio palauttaa false, jos parametri on luku mutta ei nolla. 
# Funktio nostaa TypeError-poikkeuksen, jos parametri ei ole luku. 
# Kokeile kutsua  ohjelmasta funktioita eri arvoilla. Toteuta kutsuvalla ohjelmalle try - except. 
# Mitä havaitset? Vastaukset tehtävän alkuun kommentteina.

# Vastaus mitä havaitsen try - except -rakenteesta on, että jos annettu syöte ei ole luku, niin except "korvaa" sen errorin
# mitä funktio itsessään antaisi. Eli ilman tuota rakennetta jos annan inputiksi kirjaimen niin funktio itsessään nostaa TypeError
# mutta try - except -rakenteella except korvaa tuon TypeErrorin annetulla printillä: Ei ole luku.

def isthiszero(num):
        
    if type(num) == int and num == 0:
        return True
    elif type(num) == int and num != 0:
        return False
    else:
        raise TypeError("Annettu syöte ei ole luku")
try:
    num = 0
    print(isthiszero(num))
except:
    print("Ei olla luku.")
