import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

data = load_diabetes(as_frame=True)
df = data.frame # type: ignore

sns.heatmap(data=df.corr().round(2), annot=True)
#plt.show()

plt.subplot(1,3,1)
plt.scatter(df['bmi'], df['target'])
plt.xlabel('bmi')
plt.ylabel('target')

plt.subplot(1,3,2)
plt.scatter(df['s5'], df['target'])
plt.xlabel('s5')
plt.ylabel('target')

plt.subplot(1, 3, 3)                # HERE IS THE ANSWER FOR A) question
plt.scatter(df['bp'], df['target']) # A) I would probably add the "bp" (blood pressure) variable, because it has the next highest correlation with the "target" variable.
plt.xlabel('bp')
plt.ylabel('target')

#plt.show()

# testing model with additional variable "bp"
X = pd.DataFrame(df[['bmi','s5','bp','s6']], columns = ['bmi','s5','bp','s6'])
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2, random_state=5)
lm = LinearRegression()
lm.fit(X_train,y_train)

y_train_predict = lm.predict(X_train)
rmse = (np.sqrt(mean_squared_error(y_train, y_train_predict)))
r2 = r2_score(y_train,y_train_predict)

y_test_predict = lm.predict(X_test)
rmse_test = (np.sqrt(mean_squared_error(y_test, y_test_predict)))
r2_test = r2_score(y_test, y_test_predict)

print(rmse,r2)
print(rmse_test,r2_test)

# Scores with 'bmi', 's5' and 'bp':
# RMSE = 55.326..., R2 = 0.474...
# RMSE (test) = 56.625..., R2 (test) = 0.491...

# The original metrics with 'bmi' and 's5':
# RMSE = 56.560890965481114, R2 = 0.4507519215172524
# RMSE (test) = 57.1759740950605, R2 (test)= 0.4815610845742896

# B)
# We were able to lower the root mean square error by a small amount and increased the R-squared a little bit more. So by adding 'bp' variable to the model 
# we were able to increase the model's performance by a small amount.

# C)
# By adding fourth variable, the metrics might improve but one should be careful when picking the fourth variable because it shouldn't be a variable that has a high correlation with another variable like 'bp' and 's4'.
# I did test this personally and the metrics went to the same state as with just 'bmi' and 's5', so the above statement is true.
# Therefore, we can read the heatmap and choose the next highest correlation from the 'target' variable which appears to be 's6' with 0.38 correlation. 
# Now, adding 's6' gives the metrics:

# RMSE = 55.31658546994166, R2 = 0.47465235308957865
# RMSE (test) = 56.56123321120833, R2 (test) = 0.4926493881197447

# Again, we get quite similar results as adding 'bp' variable. The RMSE dropped very slightly and R2 rose just a hinch.
# Therefore, it is safe to assume that adding more and more variables with lesser correlation to 'target' value is less and less profitable.