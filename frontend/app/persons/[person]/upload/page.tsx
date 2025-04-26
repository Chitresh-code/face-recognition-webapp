"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function UploadImagesPage() {
  const { person } = useParams<{ person: string }>()
  const router = useRouter()

  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files
    if (!selectedFiles) return
  
    setFiles((prev) => [...prev, ...Array.from(selectedFiles)])
  }  

  async function handleUpload() {
    if (files.length === 0) return

    const formData = new FormData()
    formData.append("person_name", decodeURIComponent(person))
    files.forEach((file) => {
        formData.append("file", file)
    })      

    setUploading(true)
    try {
      const response = await fetch(`${API_URL}/person/image/`, {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        alert("Images uploaded successfully ✅")
        router.push("/persons")
      } else {
        alert("Failed to upload images.")
        console.error(await response.text())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    if (showCamera) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch(console.error)
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [showCamera])

  function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `capture_${Date.now()}.png`, { type: "image/png" })
        setFiles((prev) => [...prev, file])
      }
    }, "image/png")
  }

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Upload Images for {decodeURIComponent(person)}</h1>
          <p className="text-gray-600">Upload or capture clear, front-facing photos for best training results.</p>
        </div>

        <div className="space-y-6 max-w-md mx-auto text-center">
  
        {/* Upload images block */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
            <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:underline">
            Click to select images or drag them here
            </label>
        </div>

        {/* Open Camera Button */}
        <Button
            onClick={() => setShowCamera(!showCamera)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
        >
            {showCamera ? "Close Camera" : "Open Camera"}
        </Button>

        {/* Show webcam when opened */}
        {showCamera && (
            <div className="space-y-4">
            <video ref={videoRef} autoPlay className="w-full h-64 rounded-lg border shadow" />
            <canvas ref={canvasRef} className="hidden" />
            <Button
                onClick={capturePhoto}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
                Capture Photo
            </Button>
            </div>
        )}
        </div>

        {files.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {files.map((file, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white border rounded shadow-sm p-2"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-xs mt-1 truncate">{file.name}</p>
              </motion.div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="text-center">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </Button>
          </div>
        )}
      </main>
    </>
  )
}