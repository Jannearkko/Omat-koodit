import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report

# 1)
df = pd.read_csv('bank.csv', delimiter=";")
# 2)
df2 = df[['y','job','marital','default','housing','poutcome']]
# 3)
df3 = pd.get_dummies(df2,columns=['job','marital','default','housing','poutcome'])
# 4)
sns.heatmap(data=df3.corr().round(2).abs(), annot=True)
#plt.show()
# There seems to be somewhat high correlation between marital_married and marital_single with 0.76 correlacy and
# a 0.46 correlacy between marital_married and martial_divorced. In poutcome, there is also quite high correlacy with
# poutcome_failure and poutcome_unknown with 0.74 and 0.45 with poutcome_other and poutcome_unknown. Other than those,
# there really is no big correlacy between the variables.

# 5)
y = df3[['y']]
X = df3[df3.columns[df3.columns != 'y']]
# 6)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state=5)
# 7)
model = LogisticRegression()
model.fit(X_train,y_train)
y_pred = model.predict(X_test)
# 8)
cnf_matrix = metrics.confusion_matrix(y_test,y_pred)
print("Confusion matrix: ",cnf_matrix)
metrics.ConfusionMatrixDisplay.from_estimator(model,X_test,y_test)
# Accuracy score with logistic regression model:
print("Accuracy (logistic regression):", metrics.accuracy_score(y_test, y_pred))

# 9) Steps 7-8 with KNN:

# 7)
classifier = KNeighborsClassifier(n_neighbors=3)
classifier.fit(X_train,y_train)
y_pred_knn = classifier.predict(X_test)
# 8)
metrics.ConfusionMatrixDisplay.from_estimator(classifier,X_test,y_test)
plt.show()
print("Classification report on KNN model: \n",classification_report(y_test,y_pred))

# 10)
# Accuracy of the logistic regression model was roughly 0.897 which rounds up to 0.9 which is the same as the f1 score
# of the KNN model in accuracy so both models were equally accurate on this subject.

