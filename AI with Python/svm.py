import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix

# 0)
df = pd.read_csv('data_banknote_authentication.csv',delimiter=',')

# 1)
X = df.drop('class',axis=1)
y = df[['class']]

# 2)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state=20)

# 3)
svclassifier = SVC(kernel="linear")
svclassifier.fit(X_train,y_train)

# 4)
y_pred = svclassifier.predict(X_test)
print("Confusion matrix with linear kernel: \n",confusion_matrix(y_test,y_pred))
print("Classification report of linear kernel: \n",classification_report(y_test,y_pred))

# 5) repeat steps with radial basis function kernel 

# 3)
svclassifier2 = SVC(kernel="rbf")
svclassifier2.fit(X_train,y_train)

# 4)
y_pred_2 = svclassifier2.predict(X_test)
print("Conf.matrix with RBF: \n",confusion_matrix(y_test,y_pred_2))
print("Classi.report of RBF: \n",classification_report(y_test,y_pred_2))

# COMPARISON
# Both models did very good. RBF was better with 100% accuracy with not a single false prediction,
# while linear model was 99% accurate with 2 false positives.
