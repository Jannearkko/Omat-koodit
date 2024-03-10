import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Ridge, Lasso
from sklearn.metrics import mean_squared_error, r2_score


df = pd.read_csv('Auto.csv',delimiter=",")
#sns.heatmap(data=df.corr().round(2).abs(),annot=True) # heatmap for practical uses
#plt.show()

X = pd.DataFrame(df[['cylinders','displacement','horsepower','weight','acceleration','year']])
y = df['mpg']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state=5)

alphas = np.linspace(0,300,50) # I had to use different alphas for Ridge and Lasso because with same alphas, the lasso looked awful
alphas2 = np.linspace(0,1,50) 
r2values = []
r2valuesLasso = []
for alp in alphas:
    rr = Ridge(alpha=alp)
    rr.fit(X_train, y_train)
    r2_test = r2_score(y_test, rr.predict(X_test))
    r2values.append(r2_test)
for alp in alphas2:
    lasso = Lasso(alpha=alp)
    lasso.fit(X_train, y_train)
    sc = lasso.score(X_test,y_test)
    r2valuesLasso.append(sc)
x_line = [min(r2values),max(r2valuesLasso)]
y_line = [86.1,86.1]
plt.plot(alphas,r2values, label="Ridge/Alpha")
plt.plot(alphas,r2valuesLasso, label="Lasso/Alpha", color="red")
plt.plot(y_line,x_line, label="High Peak")
plt.xlabel("Alpha")
plt.ylabel("R2")
plt.legend()
plt.show()

# 7) As we can see from the image attached to the return folder: The highest peak in both ridge and lasso methods is approximately
# when alpha is 86,1. Resulting in roughly 0.77508 value for the R2 in Lasso regression and R2 value of 0.77171
# with the Ridge regression.