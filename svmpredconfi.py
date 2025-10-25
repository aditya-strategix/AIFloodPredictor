import pandas as pd
import joblib
import warnings
import numpy as np


warnings.filterwarnings("ignore",category=UserWarning, module='sklearn')

try:
    svm_model=joblib.load('svm_model.joblib')
    scaler=joblib.load('scaler.joblib')
    accuracy=joblib.load('model_accuracy.joblib')
except FileNotFoundError:
    print("\nError: Model files not found.")
    print("Please run the updated 'train_model.py' script first to create them.")
    exit()

feature_names=['rainfall','temperature_c','humidity', 'water_level_m','elevation_m']

def predict_flood_from_user_input():
    
    print("\n---New Flood Prediction---")
    print(f"(This model has a general accuracy of {accuracy:.2%})")

    prompt=(
        "\nEnter the following 5 values in order, separated by spaces:\n"
        "1. Rainfall 2. Temperature 3. Humidity 4. Water Level 5. Elevation\n\n"
        "Example: 250 32 85 8.5 500\n> ")
    
    try:
        user_input=input(prompt)
        values=user_input.strip().split()
        if len(values)!=5:
            print(f"\nError: Expected 5 values, but got{len(values)}.")
            return

        features=[float(v) for v in values]
        
        #input
        new_data=pd.DataFrame([features],columns=feature_names)
        new_data_scaled=scaler.transform(new_data)
        
        #Use predict_proba to get confidence scores
        probabilities=svm_model.predict_proba(new_data_scaled)[0]
        
        prediction=np.argmax(probabilities)
        confidence=np.max(probabilities)
        
        #result
        result="Flood is likely to occur." if prediction==1 else"Flood is not likely to occur."
        
        print("\n---Prediction Result---")
        print(f"Prediction:{result}")
        print(f"Confidence Level:{confidence:.2%}\n")

    except ValueError:
        print("\nError:Invalid input. Please ensure all values are numbers.")

# Run the prediction function
if __name__=="__main__":
    predict_flood_from_user_input()