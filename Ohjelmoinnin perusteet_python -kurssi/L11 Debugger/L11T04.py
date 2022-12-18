# Mäkihypyssä käytetään viittä arvostelutuomaria. Kirjoita ohjelma, 
# joka kysyy arvostelupisteet yhdelle hypylle ja tulostaa tyylipisteiden summan siten, 
# että summasta on vähennetty pois pienin ja suurin tyylipiste.

points = []

for i in range(5):
    give_points = int(input("Give points:"))
    points.append(give_points)

print("Total points are:",sum(points)-max(points)-min(points))
