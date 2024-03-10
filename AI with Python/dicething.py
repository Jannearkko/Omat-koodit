import numpy as np
import matplotlib.pyplot as plt

def throwDice(n): # dice-function to throw dice and plot the results
    sumArr = []
    diceArr = np.random.randint(low=1,high=7,size=(n,2))
    for i in diceArr:
        sumArr.append(i[0] + i[1])
    h,h2 = np.histogram(sumArr,range(2,14))
    plt.bar(h2[:-1],h/n)
    plt.title("Dice thrown "+ str(n) + " times")
    plt.show()

nArray = [500,1000,2000,5000,10000,15000,20000,50000,100000] # initialize array for n-times 
for i in nArray: # requested loop to throw dice n-times
    throwDice(i)

# 4) The more times the dice is thrown, the more the values of two dices get towards the mean of the values. With just a few thousand throws the values might still wave in one direction or another but with high throw amounts all the values end up near the terminal value.
# 5) Throwing dice is an extreme event considering the values two dices might give, therefore with regression we can eliminate the most extreme events and get the mean value of all the events. Thus, making predictions much more accurate with high sample sizes.