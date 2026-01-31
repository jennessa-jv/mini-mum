from flask import Flask, request, jsonify
import joblib
import numpy as np
import traceback

app = Flask(__name__)


# load the model
model = joblib.load("crime_risk_model.pkl")
encoder = joblib.load("label_encoder.pkl")
print("Model & encoder loaded")

@app.route("/predict", methods=["POST"])
def predict():
    print("\n /predict HIT")

    try:
        data = request.json
        print("Incoming JSON:", data)

        crime_score = float(data["crime_score"])

        X = np.array([[crime_score]])
        print(" X:", X)

        pred = model.predict(X)
        print("Raw pred:", pred, type(pred))


        label = encoder.inverse_transform(pred)[0]
        print("Label:", label)

        # probability (safe)
        prob = 1.0
        if hasattr(model, "predict_proba"):
            try:
                prob = float(model.predict_proba(X)[0].max())
            except Exception as e:
                print("predict_proba failed:", e)

        return jsonify({
            "riskLevel": label,
            "confidence": prob
        })

    except Exception as e:
        print("exception in python")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
