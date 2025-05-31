from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from dotenv import load_dotenv

load_dotenv()

from facial_analysis import comparar_caras
from utils.s3 import cargar_imagen_desde_s3

app = FastAPI()

@app.get("/")
def root():
    return {"Hello": "World"}

class ImageKeys(BaseModel):
    document_key: str
    selfie_key: str

@app.post("/comparar")
def comparar(data: ImageKeys):
    doc = cargar_imagen_desde_s3("deepfakesbucket", data.document_key)
    selfie = cargar_imagen_desde_s3("deepfakesbucket", data.selfie_key)
    resultado, score = comparar_caras(doc, selfie)
    return {"match": bool(resultado), "score": float(score)}

