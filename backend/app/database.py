import pickle
import json
from pathlib import Path

ENCODINGS_PATH = Path("face_data/encodings.pkl")
METADATA_PATH = Path("face_data/metadata.json")

def save_encodings(encodings):
    ENCODINGS_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(ENCODINGS_PATH, "wb") as f:
        pickle.dump(encodings, f)

def load_encodings():
    if not ENCODINGS_PATH.exists():
        return []
    with open(ENCODINGS_PATH, "rb") as f:
        return pickle.load(f)

def save_metadata(metadata):
    METADATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(METADATA_PATH, "w") as f:
        json.dump(metadata, f, indent=4)

def load_metadata():
    if not METADATA_PATH.exists():
        return {}
    with open(METADATA_PATH, "r") as f:
        return json.load(f)