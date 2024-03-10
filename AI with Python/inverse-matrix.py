import numpy as np

A = np.array([[1,2,3],[0,1,4],[5,6,0]])

inv_A = np.linalg.inv(A)

prod_AA_inv = np.dot(A,inv_A)
prod_inv_AA = np.dot(inv_A,A)

def is_prod_unit_matrix(matrix):
    epsilon = 1e-10 #something small to account for floating errors
    return np.all(np.abs(matrix - np.eye(matrix.shape[0])) < epsilon)

is_prod_AA_inv_unit_matrix = is_prod_unit_matrix(prod_AA_inv)
is_prod_inv_AA_unit_matrix = is_prod_unit_matrix(prod_inv_AA)

print("Inverse matrix A: ", inv_A)
print("Product of A * inv_A: ", prod_AA_inv)
print("Product of inv_A * A: ", prod_inv_AA)
print("Is product A * inv_A a unit matrix?: ", is_prod_AA_inv_unit_matrix)
print("Is product inv_A * A a unit matrix?: ", is_prod_inv_AA_unit_matrix)