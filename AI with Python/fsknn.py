import matplotlib.pyplot as plt
from sklearn import neighbors
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler
import pandas as pd
import numpy as np

def pounds_to_kilos(pounds):
    return pounds * 0.45359237
def inches_to_cm(inches):
    return inches * 2.54
# 0)
df = pd.read_csv('weight-height.csv',delimiter=',')
df[['weight_kilos']] = df[['Weight']].apply(pounds_to_kilos)
df[['height_cm']] = df[['Height']].apply(inches_to_cm)
# 1)
y = df[['weight_kilos']]
X = df[['height_cm']]
# 2)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state=5)
# 3)
X_train_norm = MinMaxScaler().fit_transform(X_train)
X_test_norm = MinMaxScaler().fit_transform(X_test)
X_train_std = StandardScaler().fit_transform(X_train)
X_test_std = StandardScaler().fit_transform(X_test)
# 4)
lm = neighbors.KNeighborsRegressor(n_neighbors=5)
lm.fit(X_train,y_train)
y_pred = lm.predict(X_test)
print("R2 = ",lm.score(X_test,y_test))
# 5) normalized data
lm.fit(X_train_norm,y_train)
y_pred_norm = lm.predict(X_test_norm)
print("R (norm) = ",lm.score(X_test_norm,y_test))
# standardized data
lm.fit(X_train_std,y_train)
y_pred_std = lm.predict(X_test_std)
print("R2 (std) = ",lm.score(X_test_std,y_test))

# COMPARISON

# R2 value w/o feature scaling was roughly 82% and with normalized data it was 79,6% and with standardized data
# it was 82,4% so we can safely say that the std KNN performed the best.