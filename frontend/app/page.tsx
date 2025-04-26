"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-12">
        <div className="w-full max-w-6xl mx-auto space-y-16 text-center">

          {/* Hero Section */}
          <section className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Build Intelligent Systems With Face Recognition
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              FaceRec empowers you to register users, train on their photos, and recognize them in real-time using a powerful CNN-based recognition engine. Fast, accurate, private.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <Button size="lg" variant="outline" className="px-8 hover:bg-blue-500 hover:text-white transition-colors">
                  Learn More
                </Button>
              </Link>
              <Link href="/persons">
                <Button size="lg" variant="outline" className="px-8 hover:bg-blue-500 hover:text-white transition-colors">
                  Manage Persons
                </Button>
              </Link>
              <Link href="/recognize">
                <Button size="lg" variant="outline" className="px-8 hover:bg-blue-500 hover:text-white transition-colors">
                  Test Recognition
                </Button>
              </Link>
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <Feature title="📸 Add Users" description="Upload multiple images per user for better recognition accuracy." buttonLabel="Manage" href="/persons" />
              <Feature title="🧠 Train Model" description="CNN generates face encodings from the uploaded images." buttonLabel="Train Now" href="/persons" />
              <Feature title="⚡ Recognize Instantly" description="Identify people from webcam snapshots in real time." buttonLabel="Test Recognition" href="/recognize" />
            </div>
          </section>

          {/* Why FaceRec */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Why FaceRec?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <Feature title="🔒 Privacy Friendly" description="No cloud servers needed — everything runs locally." />
              <Feature title="⚡ Fast Inference" description="Optimized CNN embeddings ensure quick and accurate matching." />
              <Feature title="🧩 Modular API" description="Simple FastAPI endpoints that integrate easily into other systems." />
            </div>
          </section>

          {/* Demo Info Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">About This Demo</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-center">
              FaceRec is a fully functional demonstration of face recognition capabilities. While this web app uses local processing for privacy, the system can be integrated into real-time applications such as security, banking, and personalized services.
            </p>
          </section>

          {/* Use Cases Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Real-World Use Cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Feature title="🏢 Employee Attendance" description="Automate employee check-in/out securely using face recognition." />
              <Feature title="🛡️ Security Systems" description="Identify and monitor access points in real-time using smart surveillance." />
              <Feature title="🛒 Personalized Retail" description="Enhance shopping experiences with face-based loyalty programs." />
              <Feature title="🏦 Banking Authentication" description="Enable secure and seamless login or transaction authentication using faces." />
              <Feature title="🎓 Educational Platforms" description="Verify student presence during online exams or classes." />
              <Feature title="🏥 Healthcare Access" description="Identify patients and streamline healthcare management safely." />
            </div>
          </section>

          {/* Built With */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Built With</h2>
            <div className="flex justify-center gap-3 flex-wrap text-sm text-gray-700">
              <Tag emoji="🐍" name="Python" />
              <Tag emoji="🚀" name="FastAPI" />
              <Tag emoji="🧠" name="CNN Model" />
              <Tag emoji="👁️" name="OpenCV" />
              <Tag emoji="⚛️" name="Next.js" />
              <Tag emoji="🧩" name="TypeScript" />
              <Tag emoji="🎨" name="Tailwind CSS" />
              <Tag emoji="🧱" name="shadcn/ui" />
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 FaceRec. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/persons" className="hover:underline">Manage</Link>
            <Link href="/recognize" className="hover:underline">Recognize</Link>
          </div>
        </div>
      </footer>
    </>
  )
}

function Feature({ title, description, buttonLabel, href }: { title: string; description: string; buttonLabel?: string; href?: string }) {
  return (
    <div className="group p-6 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
      {href && buttonLabel && (
        <Link href={href} className="mt-4">
          <Button
            variant="secondary"
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {buttonLabel}
          </Button>
        </Link>
      )}
    </div>
  )
}

function Tag({ emoji, name }: { emoji: string; name: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-full bg-white shadow-sm">
      <span>{emoji}</span> {name}
    </span>
  )
}