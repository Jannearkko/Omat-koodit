# Tee ohjelma joka kysyy käyttäjältä kokonaisluvun.
number = int(input("Anna kokonaisluku: "))
if number == 10 or number == 20:
    print("Luku on 10 tai 20")
elif number == 100 or number == 200:
    print("Luku on 100 tai 200")
else:
    print("Lukusi on ", number)

# sama funktiona
def check_int(num):
    if num == 10 or num == 20:
        retval = "Luku on 10 tai 20"
    elif num == 100 or num == 200:
        retval = "Luku on 100 tai 200"
    elif num < 0:
        retval = "-1"
    else:
        retval = "Lukusi on ", num
    return retval