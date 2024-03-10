from sklearn.metrics import classification_report, confusion_matrix
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
from sklearn.model_selection import train_test_split
import pandas as pd
import graphviz
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# 0)
df = pd.read_csv("suv.csv", delimiter=',')
# 1)
y = df[['Purchased']]
X = df[['Age','EstimatedSalary']]
# 2)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state=5)
# 3)
X_train_std = StandardScaler().fit_transform(X_train)
X_test_std = StandardScaler().fit_transform(X_test)
# 4)
classifier = DecisionTreeClassifier(criterion="entropy")
classifier.fit(X_train_std,y_train)
y_pred = classifier.predict(X_test_std)
# 5)
print("Confusion matrix = \n",confusion_matrix(y_test,y_pred))
print("Classification report = \n",classification_report(y_test,y_pred))
# 6) Gini variant
classifier2 = DecisionTreeClassifier()
classifier2.fit(X_train_std,y_train)
y_pred2 = classifier2.predict(X_test_std)
print("Confusion matrix (gini) = \n",confusion_matrix(y_test,y_pred2))
print("Classification report (gini) = \n",classification_report(y_test,y_pred2))

# 7)
# Decision Tree with entropy criteria performed slightly worse than with 84% accuracy against the gini criteria.
# the precision to predict 0's was 0,90 to 0,91 on both models but the entropy model was over 12% behind predicting 1's than
# the gini model. Accuracy of the gini model was 89%.