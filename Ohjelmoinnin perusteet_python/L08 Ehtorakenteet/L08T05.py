# Tehtävä 5.

value = 0

num1 = int(input("Insert a number: "))
num2 = int(input("Insert a number: "))
num3 = int(input("Insert a number: "))
num4 = int(input("Insert a number: "))
num5 = int(input("Insert a number: "))

if num1 > 0:
    value += num1
if num2 > 0:
    value += num2
if num3 > 0:
    value += num3
if num4 > 0:
    value += num4
if num5 > 0:
    value += num5

print("Sum is: ", value)

