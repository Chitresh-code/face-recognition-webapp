
# 🎯 Face Recognition Web API

A **FastAPI-powered** backend for a face recognition system.  
Supports training new persons, uploading images, and recognizing faces using a **CNN-based pipeline**.


## 🚀 How It Works

The system is designed to detect and recognize human faces through the following stages:

1. **Face Detection**
   - Detect faces in images using a CNN-based face detector.
   - Highly accurate under diverse lighting and angles.

2. **Feature Extraction (Face Embeddings)**
   - Generate a fixed-length 128D feature vector for every detected face.
   - Acts like a unique "fingerprint" for each person.

3. **Face Recognition**
   - Compare new face embeddings against saved known embeddings.
   - Identify the closest match using **Euclidean Distance**.


## 📦 Project Structure

```
backend/
├── app/
│   ├── main.py           # FastAPI app entrypoint
│   ├── models.py         # Pydantic request/response models
│   ├── database.py       # Encoding load/save logic
│   └── face_engine.py    # Core recognition logic
├── training/             # Uploaded training images
├── face_data/            # Saved embeddings (pickle files)
├── Dockerfile            # Docker build file
├── requirements.txt      # Python dependencies
├── README.md             # This documentation
└── .gitignore            # Ignored files
```

---

## 📚 API Endpoints

| Endpoint | Method | Purpose |
|:---|:---|:---|
| `/person/` | POST | Create a new person (folder) |
| `/person/image/` | POST | Upload one or more images for a person |
| `/person/` | GET | List all existing persons |
| `/person/train/` | POST | Train the system on a person's images |
| `/person/{person_name}` | DELETE | Delete a person and their data |
| `/recognize/` | POST | Recognize a person from an uploaded image |

---

## 🛠️ Technologies Used

- **Python 3.10**
- **FastAPI** — REST API Framework
- **OpenCV** — Image processing
- **face_recognition** — CNN-based face detection and encoding
- **Uvicorn** — ASGI server
- **Docker** — Containerized deployment

---

## ⚙️ Local Development Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Chitresh-code/face-recognition-webapp.git
    cd face-recognition-webapp/backend
    ```

2. (Optional but recommended) Create a virtual environment:

    ```bash
    python -m venv venv
    venv\Scripts\activate  # On Linux: source venv/bin/activate
    ```

3. Install Python dependencies:

    ```bash
    pip install --upgrade pip
    pip install -r requirements.txt
    ```

4. Run the FastAPI server:

    ```bash
    uvicorn app.main:app --reload
    ```

5. Open the API Docs at:

    ```
    http://127.0.0.1:8000/docs
    ```

## 📸 Future Enhancements

- Real-time webcam face recognition via browser
- Switch to database storage (PostgreSQL, MongoDB) for embeddings
- JWT-based user authentication for management APIs
- Add face detection from live streaming video feeds


# 🧠 About

This project demonstrates how **CNN-based face recognition** can be deployed into real-world applications using lightweight, fast, and privacy-friendly technology stacks.
