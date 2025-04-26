from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.models import CreatePersonRequest, TrainPersonRequest
from fastapi.middleware.cors import CORSMiddleware
from app import face_engine, database
from pathlib import Path
from typing import List
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TRAINING_DIR = "training"
FACE_DATA_DIR = "face_data"
Path(TRAINING_DIR).mkdir(exist_ok=True)
Path(FACE_DATA_DIR).mkdir(exist_ok=True)

@app.post("/person/")
async def create_person(request: CreatePersonRequest):
    try:
        person_folder = Path(TRAINING_DIR) / request.person_name
        if not person_folder.exists():
            person_folder.mkdir(parents=True)
            return {"message": f"Person '{request.person_name}' created."}
        else:
            return {"message": f"Person '{request.person_name}' already exists."}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/person/image/")
async def add_images(
    person_name: str = Form(...),
    file: List[UploadFile] = File(...)
):
    try:
        person_folder = Path(TRAINING_DIR) / person_name
        if not person_folder.exists():
            return JSONResponse(content={"error": "Person not found."}, status_code=404)

        for image in file:
            dest = person_folder / image.filename
            with open(dest, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

        return {"message": f"{len(file)} images uploaded for '{person_name}'."}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/person/")
async def list_persons():
    try:
        metadata = database.load_metadata()
        persons = []

        for folder in Path(TRAINING_DIR).iterdir():
            if folder.is_dir():
                trained = metadata.get(folder.name, False)
                persons.append({"name": folder.name, "trained": trained})

        return persons
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
@app.delete("/person/")
async def delete_person(person_name: str = Form(...)):
    try:
        person_folder = Path(TRAINING_DIR) / person_name
        encoding_file = Path(FACE_DATA_DIR) / f"{person_name}.pkl"

        if not person_folder.exists():
            return JSONResponse(content={"error": "Person not found."}, status_code=404)

        # Delete training images folder
        shutil.rmtree(person_folder)

        # Delete face encoding file if it exists
        if encoding_file.exists():
            encoding_file.unlink()

        return {"message": f"All data for '{person_name}' has been deleted successfully."}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/person/train/")
async def train_person(request: TrainPersonRequest):
    try:
        known_faces = database.load_encodings()

        new_encodings = face_engine.encode_faces_for_person(TRAINING_DIR, request.person_name)
        for enc in new_encodings:
            known_faces.append({
                "name": request.person_name,
                "encoding": enc
            })

        database.save_encodings(known_faces)

        # Update metadata to mark person as trained
        metadata = database.load_metadata()
        metadata[request.person_name] = True
        database.save_metadata(metadata)

        return {"message": f"Trained and saved {len(new_encodings)} encodings for {request.person_name}."}
    except FileNotFoundError:
        return JSONResponse(content={"error": "Person folder not found."}, status_code=404)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
@app.post("/recognize/")
async def recognize_face(file: UploadFile = File(...)):
    try:
        known_faces = database.load_encodings()
        image_bytes = await file.read()
        results = face_engine.recognize_face(image_bytes, known_faces)

        return {"results": results}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)