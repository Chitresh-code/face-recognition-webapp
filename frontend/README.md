# 🎨 Face Recognition Web Frontend

This project is a **Next.js** + **Tailwind CSS** frontend for the Face Recognition Web API.

It provides an intuitive, modern UI to:
- Add new persons and upload images
- Train the face recognition model
- Test the recognition functionality
- Manage persons (view, delete, update)

---

## 🚀 How It Works

This frontend communicates with the FastAPI backend via REST APIs.

Main features:

- **Home Page**  
  Overview of the system, its working, and quick navigation to all features.

- **About Page**  
  Detailed explanation of the underlying CNN-based face recognition system.

- **Persons Management**  
  - View all registered persons
  - Add new persons via popups
  - Upload images from files or camera
  - Train models individually per person
  - Delete persons

- **Recognition Testing**  
  Upload an image or capture via webcam to recognize the person.

---

## 📦 Project Structure

```
frontend/
├── app/
│   ├── home/               # Landing page (Home)
│   ├── about/              # About page (tech deep dive)
│   ├── persons/            # Manage persons (list, add, upload)
│   ├── recognize/          # Recognize page (upload/capture)
├── components/
│   ├── Navbar.tsx          # Top navigation bar
│   ├── ui/                 # shadcn/ui reusable components
├── public/                 # Static files (logo, images)
├── styles/                 # Tailwind CSS styles
├── tailwind.config.ts      # Tailwind CSS config
├── next.config.js          # Next.js configuration
├── package.json            # NPM dependencies
├── README.md               # Project documentation
└── .gitignore              # Git ignored files
```

---

## 🌐 Technologies Used

- **Next.js 14** — React-based fullstack framework
- **Tailwind CSS 4** — Modern utility-first CSS framework
- **Shadcn/ui** — Beautiful and customizable UI components
- **Framer Motion** — For smooth animations
- **TypeScript** — (Optional: if enabled)
- **Fetch API** — For backend communication
- **Web APIs** — Using `navigator.mediaDevices` for webcam

---

## ⚙️ Local Development Setup

1. Move into frontend directory:

    ```bash
    cd frontend
    ```

2. Install NPM dependencies:

    ```bash
    npm install
    ```

3. Set API URL:

   - Create a `.env.local` file inside `frontend/`
   - Add the following line:

    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

   (Change this URL if your backend runs somewhere else.)

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open the app:

    ```
    http://localhost:3000
    ```

---

## 🐳 Running with Docker

1. Make sure you have Docker installed.

2. Then, if you're running fullstack (backend + frontend):

    ```bash
    docker-compose up --build
    ```

✅ Both backend (FastAPI) and frontend (Next.js) will be up and running!

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

---

## 📸 Features Demo (Planned)

| Feature | Status |
|:---|:---|
| Add Persons | ✅ |
| Upload Images | ✅ |
| Capture via Webcam | ✅ |
| Train Per Person | ✅ |
| Recognition via Upload/Webcam | ✅ |

---

## 📚 Future Enhancements

- Toast notifications (upload success, errors, etc.)
- Admin dashboard view for statistics
- Real-time face detection inside camera stream
- Password-protected API access

---

# 🧠 About

This frontend demonstrates how easy it is to integrate **face recognition technology** into modern web applications.  
It aims to be fast, beautiful, and developer-friendly — ready for real-world deployments.

---