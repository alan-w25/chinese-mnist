from fastapi import APIRouter, HTTPException 
from pydantic import BaseModel
from backend.app.models.model import load_model
from backend.app.utils.image_processing import transform_image
from ml_model.scripts.logger import logging
from ml_model.scripts.exception import CustomException
from PIL import Image, ImageOps
import base64
import torch
import sys
import time 
import io


class PredictRequest(BaseModel):
    image: str
    
class PredictResponse(BaseModel):
    prediction: int
    confidence: float

router = APIRouter()

model_path = "../ml_model/models/saved_model.pth"
model = load_model(model_path)

prediction_to_class = {
    0:0, 
    1:1, 
    2:2, 
    3:3, 
    4:4,
    5:5, 
    6:6,
    7:7, 
    8:8,
    9:9,
    10:10,
    11:100, 
    12:1000, 
    13:10000,
    14:100000000
}


@router.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    try:
        image_data = base64.b64decode(request.image)
        image = Image.open(io.BytesIO(image_data))
        tensor = transform_image(image)
        
        with torch.no_grad():
            outputs = model(tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
            prediction = prediction_to_class[predicted.item()]
            confidence = round(confidence.item() * 100,3)
        logging.info(f"Prediction made: {prediction}")
        return PredictResponse(prediction=prediction, confidence=confidence)
    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        raise CustomException("Error during prediction", sys)


