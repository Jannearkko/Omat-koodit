number = 5
accountbalance = 110.54
print(number)
print(accountbalance)

number = 55
number2 = number + 2
# value of number2 is now 57
print("number2 is ", number2)

# Python assigns an automatic type for each variable
# the variable type can be checked with type()
print("Type of the variable 'number' is ", type(number))
print("Type of the variable 'accountbalance' is ", type(accountbalance))

# strings
# initialize string from text in quotes
name = "Janne"
lastName = "Arkko"

# initialize string from another string
fullName = name

# add strings to string
fullName = name + " " + lastName
print(fullName)

# use Format function
age = 30
fullName = "First name: {}. Last name: {}. Age: {}".format(name, lastName, age)
print(fullName)

# access characters in a string
text = "ABC"
a = text[0]
b = text[1]
c = text[2]
print("Second char is " + b)

# print text length into console
print("Text length is " + str(len(text)) + " characters.")

# compare strings
text2 = "ABD"
if text == text2:
    print("Texts are identical.")
else:
    print("Texts are not identical")

# read text from console
line = input("Enter a line of text: ")
print("You entered " + line)

# read numeric value to variable 'number'
# note that if user enters text that cannot be converted to a number, an
# error is generated. We will later learn how to handle these situations
line = input("Enter a number: ")
number = int(line)
print("Number is ", number)


