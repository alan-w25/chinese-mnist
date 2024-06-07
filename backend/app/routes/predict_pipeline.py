from fastapi import APIRouter, HTTPException 
from pydantic import BaseModel
from backend.app.models.model import load_model
from backend.app.utils.image_processing import transform_image
from ml_model.scripts.logger import logging
from ml_model.scripts.exception import CustomException
import base64
import torch
import sys


class PredictRequest(BaseModel):
    image: str
    
class PredictResponse(BaseModel):
    prediction: int

router = APIRouter()

model_path = "ml_model/models/saved_model.pth"
model = load_model(model_path)

@router.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    try:
        image_data = base64.b64decode(request.image)
        tensor = transform_image(image_data)
        with torch.no_grad():
            outputs = model(tensor)
            _, predicted = torch.max(outputs.data, 1)
            prediction = predicted.item()
        logging.info(f"Prediction made: {prediction}")
        return PredictResponse(prediction=prediction)
    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        raise CustomException("Error during prediction", sys)


