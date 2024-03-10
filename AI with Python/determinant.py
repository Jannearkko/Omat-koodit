import numpy as np

A = np.array([[1,2],[3,4]])
B = np.array([[-1,1],[5,7]])

det_A = np.linalg.det(A)
det_B = np.linalg.det(B)


AB = np.dot(A,B)
det_AB = np.linalg.det(AB)

print("Determinant of matrix A: ",det_A)
print("Determinant of matrix B: ",det_B)
print("Matrix product AB: ",AB)
print("Determinant of matrix AB: ",det_AB)

# Vastaus kysymykseen miksi det (AB) = det (A) det (B):
# Koska matriisin determinantti on yhtä kuin skaalauskerroin eli kerroin jolla matriisi muuntaa sen tilavuutta.
# Kerrottaessa kaksi matriisia yhteen, lasket käytännössä näiden koostetun tilavuuden muunnoksen, joka kertoo
# kuinka paljon kumpikin matriisi skaalaa yhteistä tilavuutta.
# Matriisin AB determinantti on siis kahden yksittäisen matriisin determinanttien tulo.