# 🧠 FaceRec — Face Recognition Fullstack Project

FaceRec is a fullstack **Face Recognition System** using:

- **FastAPI** backend (Python)
- **Next.js** frontend (React + TailwindCSS)
- **Docker Compose** for easy deployment

It allows you to:
- Create persons and upload training images
- Train a CNN-based face recognition model
- Recognize persons from uploaded or captured images
- Manage everything via a modern web interface

## 🏗 Project Structure

```
face-rec/
├── backend/              # FastAPI backend server
├── frontend/             # Next.js frontend app
├── docker-compose.yml    # Docker Compose to run fullstack
├── README.md             # Main project documentation
└── .gitignore            # Git ignore rules
```

## 🚀 Running Locally (Development Mode)

You can run backend and frontend separately for development:

Clone the repository:

    ```bash
    git clone https://github.com/Chitresh-code/face-recognition-webapp.git
    cd face-recognition-webapp
    ```

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will be live at:  
`http://localhost:8000`

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend will be live at:  
`http://localhost:3000`

## 🐳 Running in Docker (Production Ready)

1. At project root (`face-rec/`), simply run:

```bash
docker-compose up --build
```

✅ Backend will be available at: `http://localhost:8000`  
✅ Frontend will be available at: `http://localhost:3000`

> Make sure Docker Desktop is running before you start!

## 📚 Technologies Used

- **Backend**: Python 3.10, FastAPI, OpenCV, CNN models
- **Frontend**: Next.js 14, Tailwind CSS 4, shadcn/ui
- **Containerization**: Docker, Docker Compose

## ✨ Key Features

- 📸 Upload or capture training images
- 🧠 CNN-powered face embeddings
- 🖥️ Real-time recognition via webcam
- 🛡️ 100% local privacy — no cloud APIs
- ⚡ Super fast model inference
- 🐳 Easy Docker deployment

## 🔥 Future Enhancements

- Real-time recognition via continuous webcam feed
- JWT Authentication for admin operations
- Saving trained embeddings in a proper database
- Support for mobile devices and PWA mode

# 🧠 About This Project

This project demonstrates how **CNN-based face recognition** can be deployed into production-ready applications.  
Designed to be:
- Lightweight
- Private
- Scalable
- Easy to extend into real-world solutions.

> Made with ❤️ using Open Source tools.