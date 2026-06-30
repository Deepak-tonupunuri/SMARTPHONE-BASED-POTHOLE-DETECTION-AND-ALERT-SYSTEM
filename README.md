# SMARTPHONE-BASED-POTHOLE-DETECTION-AND-ALERT-SYSTEM
Smart transportation solution that detects potholes using sensor data and alerts drivers through GPS and cloud-based services.

## 📌 Project Overview

Road potholes are one of the major causes of vehicle damage, traffic congestion, and road accidents. Traditional methods of pothole detection rely on manual inspections, which are time-consuming and expensive.

The **Smartphone-Based Pothole Detection and Alert System** is an intelligent solution that uses a smartphone's built-in sensors, Machine Learning techniques, GPS, and cloud services to automatically detect potholes in real time and alert drivers about upcoming road hazards.

The system collects accelerometer and gyroscope data from a smartphone, processes the sensor readings, and uses a trained Machine Learning model to classify road conditions as either **Pothole** or **Normal Road**. When a pothole is detected, its GPS coordinates are stored in Firebase and displayed on a map for future reference.

---

# 🚀 Features

* Real-time pothole detection using smartphone sensors.
* Utilizes Accelerometer and Gyroscope data.
* Machine Learning-based classification using Random Forest.
* GPS location tracking of detected potholes.
* Cloud storage using Firebase Realtime Database.
* Interactive map visualization using Leaflet.js.
* Alerts drivers about potholes ahead.
* Responsive web dashboard.
* Stores timestamp and severity of detected potholes.
* Scalable and low-cost solution for smart transportation systems.

---

# 🏗️ System Architecture

Smartphone Sensors
        ↓
Data Collection
        ↓
Feature Extraction
        ↓
Machine Learning Model
        ↓
Pothole Detection
        ↓
GPS Coordinates
        ↓
Firebase Database
        ↓
Web Dashboard & Driver Alerts


# 🛠️ Technologies Used

## Programming Languages

* Python
* JavaScript
* HTML5
* CSS3

## Libraries and Frameworks

- Flask
- Flask-CORS
- Scikit-Learn
- Pandas
- NumPy
- Joblib
- Firebase Admin SDK
- Geopy
- Geocoder
- OpenDatasets
- Leaflet.js

## Database

* Firebase Realtime Database

## Machine Learning Algorithm

* Random Forest Classifier


# 📂 Project Structure

Smartphone-Based-Pothole-Detection/
│
├── app.py
├── pothole.py
├── pothole_model.pkl
├── templates/
│      └── index.html
├── static/
│      ├── style.css
│      ├── script.js     
├── dataset/
│      └── Pothole
│      └── RoadCondition
├── firebase/
│      └── firebase_config.json
└── README.md

# 📊 Dataset

Dataset used in this project:

**Kaggle Pothole Sensor Dataset**

The dataset contains:

* Accelerometer X-axis values
* Accelerometer Y-axis values
* Accelerometer Z-axis values
* Gyroscope X-axis values
* Gyroscope Y-axis values
* Gyroscope Z-axis values
* Labels indicating pothole or non-pothole events.

Dataset Link:

https://www.kaggle.com/datasets/dextergoes/pothole-sensor-data



# ⚙️ Data Preprocessing

The collected sensor data undergoes several preprocessing steps:

1. Missing value handling
2. Noise filtering
3. Window segmentation
4. Feature extraction
5. Data normalization

### Extracted Features

For each sensor axis:

* Mean
* Standard Deviation
* Maximum Value
* Minimum Value
* Root Mean Square (RMS)

Window Size:

window_size = 80


# 🤖 Machine Learning Model

## Algorithm Used

Random Forest Classifier

### Why Random Forest?

* High classification accuracy
* Robust against noisy sensor data
* Handles non-linear relationships effectively
* Less prone to overfitting
* Suitable for real-time applications

# 📈 Model Performance

| Metric    | Value |
| --------- | ----- |
| Accuracy  | 90%   |
| Precision | 89%   |
| Recall    | 88%   |
| F1-Score  | 88%   |

The trained model successfully distinguishes pothole events from normal road conditions with an overall accuracy of **90%**.



# 📍 GPS and Location Tracking

Whenever a pothole is detected:

1. Current GPS coordinates are obtained.
2. Latitude and longitude are generated.
3. Timestamp is recorded.
4. Data is stored in Firebase.

Example:

json
{
  "latitude": 17.9784,
  "longitude": 79.5941,
  "severity": "High",
  "timestamp": "2026-06-15 10:30:22"
}


# ☁️ Firebase Integration

Firebase stores:

* Pothole locations
* Detection timestamps
* Severity levels
* User reports

Database structure:

Potholes
   ├── id_1
   │     ├── latitude
   │     ├── longitude
   │     ├── severity
   │     └── timestamp
   └── id_2


# 🗺️ Web Dashboard

Features of Dashboard:

* Start Journey button
* Live map visualization
* Current location tracking
* Pothole markers
* Navigation support
* Real-time alerts

# 🔔 Alert System

The system provides:

* Visual alerts
* Audio notifications
* Pothole warning messages
* Nearby pothole indications

# 🧪 Installation

## Clone Repository


git clone https://github.com/Deepak-tonupunuri/SMARTPHONE-BASED-POTHOLE-DETECTION-AND-ALERT-SYSTEM.git
cd SMARTPHONE-BASED-POTHOLE-DETECTION-AND-ALERT-SYSTEM


## Install Dependencies


pip install -r Requirements.txt


## Run Application


python app.py


Open browser:


http://127.0.0.1:5000



# 📦 Requirements


Flask==3.0.3
flask-cors==5.0.0
numpy==1.26.4
pandas==2.2.2
scikit-learn==1.5.1
joblib==1.4.2
geocoder==1.38.1
firebase-admin==6.5.0
geopy==2.4.1
opendatasets==0.1.22
requests==2.32.3
kaggle==1.7.4
gunicorn==22.0.0
python-dotenv==1.0.1


Install all dependencies:


pip install -r Requirements.txt


# 🎯 Applications

* Smart City Infrastructure
* Road Maintenance Systems
* Navigation Applications
* Municipal Road Monitoring
* Accident Prevention Systems
* Autonomous Vehicle Assistance



# 🔮 Future Enhancements

* Deep Learning-based detection.
* Mobile application development.
* Integration with Google Maps API.
* Crowd-sourced pothole reporting.
* Severity prediction using AI.
* Real-time traffic rerouting.
* Edge AI implementation.



# 👨‍💻 Author

**Deepak Tonupunuri**

B.Tech – Computer Science and Engineering

Skills:
Python | Machine Learning | Flask | Firebase | Web Development | Data Analysis

GitHub: https://github.com/Deepak-tonupunuri

LinkedIn: https://linkedin.com/in/deepak-tonupunuri



# 📄 License

This project is developed for educational and research purposes.
