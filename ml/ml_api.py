from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from tensorflow.keras.applications.resnet50 import preprocess_input

app = Flask(__name__)

model = tf.keras.models.load_model("breast_cancer_cnn.h5")

IMG_SIZE = (224, 224)

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(IMG_SIZE)
    image = np.array(image)
    image = preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    try:
        img = preprocess_image(file.read())
        prob = float(model.predict(img)[0][0])

        if prob >= 0.5:
            prediction = "Malignant"
            confidence = prob
        else:
            prediction = "Benign"
            confidence = 1 - prob

        return jsonify({
            "prediction": prediction,
            "confidence": confidence
        })

    except Exception as e:
        print("❌ Prediction error:", e)
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
