# Tehtävä 6

year = int(input("Insert year: "))
def leap_year(year):

    leap = "Is not leap year!"

    if (year % 4 == 0) and (year % 100 != 0): 
        leap = "Is leap year!"
    elif (year % 100 == 0) and (year % 400 != 0):
        leap = "Is not leap year!"
    elif (year % 400 == 0):
        leap = "Is leap year!"
    else:
        leap = "Is not leap year!"
    return leap
print(leap_year(year))




