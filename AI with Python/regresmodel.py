import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model, metrics
from sklearn.model_selection import train_test_split
import pandas as pd

df = pd.read_csv("weight-height.csv",delimiter=",")

X = df[["Height"]]
y = df[["Weight"]]

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2)

# 1)

plt.scatter(X,y)
plt.xlabel("Height")
plt.ylabel("Weight")
#plt.show()

# 2) and 3)

linmodel = linear_model.LinearRegression()
model = linmodel.fit(X_train,y_train)

# 4)
plt.scatter(X,y)
plt.plot(X_test,linmodel.predict(X_test),color="red")
plt.title("Predictions")
plt.show()

# 5)
yhat = linmodel.predict(X)
print("R2 = ", metrics.r2_score(y_test,linmodel.predict(X_test)))
print("RMSE = ", np.sqrt(metrics.mean_squared_error(y,yhat)))

# 6)

# R2 value is roughly 86% which is quite good, all tho could be better. The residual pattern of X and y is nice and tidy, therefore the R2 value is also quite high. There were no rogue-dots in the pattern. The regression line fits nicely on the data.
# RMSE is also quite low, meaning that there is only a little variance between the fitted model and the observed data.