import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.read_csv("maternal_data.csv")
print(data)
X = data[[
    "systolicBP",
    "diastolicBP",
    "weight",
    "bloodSugar",
    "heartRate"
]]

y = data["risk"]

model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

joblib.dump(model, "risk_model.pkl")

print("Model trained and saved")
