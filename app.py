from flask import Flask, request, jsonify, render_template
import numpy as np
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load("pothole_model.pkl")

# ✅ Serve UI
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)
        prediction = model.predict(features)

        return jsonify({
            "prediction": int(prediction[0])
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")