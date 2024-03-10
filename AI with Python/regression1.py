import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn import linear_model

data = np.genfromtxt("linreg_data.csv", delimiter=",")
xp = data[:,0]
yp = data[:,1]
xp = xp.reshape(-1,1)
yp = yp.reshape(-1,1)

regr = linear_model.LinearRegression()
regr.fit(xp,yp)