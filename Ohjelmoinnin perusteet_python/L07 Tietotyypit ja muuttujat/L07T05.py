#L07T05
saldo = 2000
print("Bank account balance:", saldo, "€")
addeuros = int(input("How many euros will be added to the balance? "))
addcents = int(input("How many cents will be added to the balance? "))
print("Bank account balance:", saldo + addeuros + addcents / 100, "€")