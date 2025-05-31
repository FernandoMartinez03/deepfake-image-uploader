import boto3
import io
import numpy as np
import cv2
import os
from dotenv import load_dotenv
load_dotenv()

s3 = boto3.client(
    "s3",
    region_name=os.getenv("AWS_REGION"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

def cargar_imagen_desde_s3(bucket: str, key: str):
    """
    Descarga una imagen desde S3 y la convierte en un array de OpenCV (BGR).
    """
    response = s3.get_object(Bucket=bucket, Key=key)
    contenido = response['Body'].read()

    # Convertimos bytes -> NumPy array -> Imagen OpenCV
    imagen_np = np.asarray(bytearray(contenido), dtype=np.uint8)
    print("📦 Bytes descargados desde S3:", len(contenido))

    imagen = cv2.imdecode(imagen_np, cv2.IMREAD_COLOR)
    
    if imagen is None:
        raise ValueError("No se pudo decodificar la imagen desde S3")
    
    return imagen
