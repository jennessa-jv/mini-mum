from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("risk_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["systolicBP"],
        data["diastolicBP"],
        data["weight"],
        data["bloodSugar"],
        data["heartRate"]
    ]])

    prediction = model.predict(features)[0]

    return jsonify({ "risk": prediction })

if __name__ == "__main__":
    app.run(port=8000)
