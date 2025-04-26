import face_recognition
from pathlib import Path
import numpy as np
import cv2

def encode_faces_for_person(training_dir: str, person_name: str):
    person_path = Path(training_dir) / person_name
    if not person_path.exists():
        raise FileNotFoundError(f"Person folder '{person_name}' does not exist.")

    encodings = []

    for img_path in person_path.glob("*.*"):
        image = face_recognition.load_image_file(img_path)
        face_locations = face_recognition.face_locations(image, model="cnn")
        face_encodings = face_recognition.face_encodings(image, face_locations)

        if face_encodings:
            encodings.append(face_encodings[0])
    
    return encodings

def recognize_face(image_bytes, known_faces, threshold=0.65):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img_rgb = cv2.cvtColor(img_np, cv2.COLOR_BGR2RGB)

    face_locations = face_recognition.face_locations(img_rgb, model="cnn")
    face_encodings = face_recognition.face_encodings(img_rgb, face_locations)

    results = []

    for face_encoding in face_encodings:
        matches = []
        for known in known_faces:
            distance = np.linalg.norm(known['encoding'] - face_encoding)
            matches.append((known['name'], distance))
        
        matches.sort(key=lambda x: x[1])  # sort by smallest distance

        if matches and matches[0][1] < threshold:
            results.append(matches[0][0])
        else:
            results.append("Unknown")
    
    return results