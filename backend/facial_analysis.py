import cv2
import numpy as np
from matplotlib import pyplot as plt
import insightface
from insightface.app import FaceAnalysis

def recortar_cara_mas_grande(img, margen=200):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    )
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    if len(faces) == 0:
        raise ValueError("No se detectó ninguna cara")

    largest = sorted(faces, key=lambda r: r[2]*r[3], reverse=True)[0]
    x, y, w, h = largest
    x1 = max(x - margen, 0)
    y1 = max(y - margen, 0)
    x2 = min(x + w + margen, img.shape[1])
    y2 = min(y + h + margen, img.shape[0])
    return img[y1:y2, x1:x2]

def comparar_caras(document_img, selfie_img):
    document_face = recortar_cara_mas_grande(document_img)
    selfie_face = recortar_cara_mas_grande(selfie_img)

    app = FaceAnalysis()
    app.prepare(ctx_id=0, det_size=(640, 640))

    doc_faces = app.get(document_face)
    selfie_faces = app.get(selfie_face)

    if not doc_faces or not selfie_faces:
        raise ValueError("No se detectaron rostros en las imágenes procesadas")

    doc_embedding = doc_faces[0].normed_embedding
    selfie_embedding = selfie_faces[0].normed_embedding

    feats = np.array([doc_embedding, selfie_embedding], dtype=np.float32)
    sims = np.dot(feats, feats.T)
    similarity_score = sims[0][1]
    return similarity_score >= 0.6, float(similarity_score)  # True/False, Score
