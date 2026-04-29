import joblib

def load_model():
    model = joblib.load("models/xgboost_model_regressor1.pkl")
    print("Model loaded successfully")
    return model