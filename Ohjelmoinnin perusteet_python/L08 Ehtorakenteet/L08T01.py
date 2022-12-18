# Make a program which asks for users age
ika = int(input("Kerro ikäsi: "))
if ika < 13:
    print("child")
elif ika < 20:
    print("teen")
elif ika < 65:
    print("adult")
else:
    print("senior")


#sama funktiolla
def kerro3(ika):
    tulos = "unknown"
    if ika < 13:
        tulos = "child"
    elif ika < 20:
        tulos = "teen"
    elif ika < 65:
        tulos = "adult"
    else:
        tulos = "senior"
    
    return tulos



