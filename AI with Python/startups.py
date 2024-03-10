import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv('50_Startups.csv', delimiter=",")
sns.heatmap(data=df.corr().round(2).abs(),annot=True)
plt.show()

plt.subplot(1,2,1)
plt.scatter(df['R&D Spend'],df['Profit'])
plt.xlabel("R&D Spend")
plt.ylabel("Profit")

plt.subplot(1,2,2)
plt.scatter(df['Marketing Spend'],df['Profit'])
plt.xlabel("Marketing Spend")
plt.ylabel("Profit")
#plt.show()

X = pd.DataFrame(df[['R&D Spend','Marketing Spend']])
y = df['Profit']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state=5)

lm = LinearRegression()
lm.fit(X_train, y_train)

y_train_predict = lm.predict(X_train)
rmse = (np.sqrt(mean_squared_error(y_train, y_train_predict)))
r2 = r2_score(y_train, y_train_predict)

y_test_predict = lm.predict(X_test)
rmse_test = (np.sqrt(mean_squared_error(y_test, y_test_predict)))
r2_test = r2_score(y_test, y_test_predict)

print("RMSE = ",rmse,"R2 = ",r2)
print("RMSE (TEST) = ",rmse_test,"R2 (TEST) = ",r2_test)

# Answers to the questions:
# 1) variables are: 'R&D Spend', 'Administration', 'Marketing Spend', 'State', 'Profit'
# 2) I drew a heatmap of the correlations and it revealed that 'R&D Spend' and 'Marketing Spend' are the ones with
#    the highest correlation to the 'Profit' variable.
# 3) I chose 'R&D Spend' and 'Marketing Spend' -variables to predict profit, because 'R&D Spend' had a staggering 0.97
#    point correlation with profit and 'Marketing Spend' had a 0.75 point correlation.
# 4) I plotted the variables in relation to profit using scatter method and 'R&D Spend' variable has, of course, 
#    a very nice tight pattern and 'Marketing Spend' was a little bit scattered and biased, but there were 'collision' with 
#    the 'R&D Spend' pattern.
# 5)-6) are above in the code

# 7) RMSE =  9358.583115148496 R2 =  0.9436198878593198
#    RMSE (TEST) =  7073.857168705303 R2 (TEST) =  0.9683604384024198
#
#    This one was interesting. The testing data showed a much better metrics than the training data. The R-square value
#    is very high, almost 97% and the RMSE is also quite low because we are talking about hundreds of thousands of dollars
#    then the -+ 7k error is quite tolerable.