from fastapi import APIRouter
from app.schemas.input_schema import InputData
from app.model.load_model import load_model
from app.model.predict import make_prediction
import logging
import numpy as np
from datetime import datetime, timezone
from typing import List, Dict, Any

logging.basicConfig(level=logging.INFO)

router = APIRouter()

model = load_model()

# In-memory prediction history (newest first, capped at 100 entries)
_history: List[Dict[str, Any]] = []
MAX_HISTORY = 100


@router.get("/")
def home():
    return {"message": "API running"}


@router.post("/predict")
def predict(data: InputData):

    features = [
        data.Dept,
        data.IsHoliday,
        data.Temperature,
        data.Fuel_Price,
        data.CPI,
        data.Unemployment,
        data.Size,
        data.Year,
        data.Month,
        data.Week
    ]

    logging.info(f"Received input: {features}")

    try:
        prediction = model.predict([features])
    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        return {"error": "Prediction failed"}

    prediction = float(np.clip(prediction[0], 0, 100000))

    logging.info(f"Prediction: {prediction}")

    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "input": data.model_dump(),
        "prediction": prediction,
    }
    _history.insert(0, entry)
    if len(_history) > MAX_HISTORY:
        _history.pop()

    return {"prediction": prediction}


@router.get("/history")
def get_history():
    return {"history": _history}