# Tee ohjelma, joka kysyy oppilaitten nimiä niin kauan kunnes käyttäjä antaa tyhjän syötteen. 
# Ohjelma kertoo tämän jälkeen montako nimeä annettiin ja näyttää ne yhtenä rivinä pilkulla erotettuna.

students = []
student = "eiole"
while student != '':
    student = input("Enter student name:")
    if student != '':
        students.append(student)

print("Student count:",len(students))
print(", ".join(students))