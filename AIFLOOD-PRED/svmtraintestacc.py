import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import joblib

print("Starting model training...")

#Load and Clean Data
df=pd.read_csv('flood.csv')

new_columns=[]
for col in df.columns:
    new_col=col.lower()
    new_col=re.sub(r'[^a-zA-Z0-9]+', '_', new_col)
    new_col=new_col.strip('_')
    new_columns.append(new_col)
df.columns=new_columns

#Data for Training
feature_names=['rainfall','temperature_c','humidity', 'water_level_m','elevation_m']

target_name='flood_occurred'

X=df[feature_names]
y=df[target_name]

#training and testing data split
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42)
scaler=StandardScaler().fit(X_train)

#Train SVM model
X_train_scaled=scaler.transform(X_train)

#prob=true
svm_model=SVC(kernel='linear',random_state=42,probability=True)
svm_model.fit(X_train_scaled, y_train)

#Evaluate Model
X_test_scaled=scaler.transform(X_test)
y_pred=svm_model.predict(X_test_scaled)
accuracy=accuracy_score(y_test, y_pred)

print(f"\nModel accuracy on test data:{accuracy:.2%}")

#Save the Model,Scaler,and Accuracy
joblib.dump(svm_model,'svm_model.joblib')
joblib.dump(scaler,'scaler.joblib')
joblib.dump(accuracy,'model_accuracy.joblib')
#Save the accuracy score

print("Model,scaler,and accuracy score have been saved successfully!")