"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-24 text-gray-800">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-bold">What Powers FaceRec?</h1>
          <p className="text-lg text-gray-600">
            Ever wondered how machines recognize faces like humans do? FaceRec makes it possible using a powerful combo of computer vision and deep learning. Here's a deep dive into what makes it tick.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">🛠️ The Recognition Pipeline</h2>
          <motion.ol className="list-decimal ml-6 space-y-3 text-gray-700 text-[15px] bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            {[
              "Capture Face via webcam or upload",
              "Use CNN to detect face region",
              "Generate a 128D embedding vector",
              "Compare with known face vectors",
              "Return match if distance is low enough",
            ].map((step, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <strong>Step {idx + 1}:</strong> {step}
              </motion.li>
            ))}
          </motion.ol>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">🧠 So... What Exactly is a CNN?</h2>
          <p>
            A <strong>Convolutional Neural Network (CNN)</strong> processes an image by scanning small sections and identifying patterns like edges, eyes, lips — eventually learning to "see" faces.
          </p>
          <p>
            Think of it like a smart grid of filters trained to understand facial structure, no matter the lighting or background.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold">🧬 From Face to Fingerprint</h2>
          <p>The face → embedding pipeline in action:</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center text-sm text-gray-600">
            {[
              "🖼️ Face Image",
              "➡️",
              "🧠 CNN Encoder",
              "➡️",
              "🔢 128D Vector",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-4 border rounded-md shadow-sm bg-white"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">📏 How Matching Works</h2>
          <p>
            Once we have the embedding, it’s just math. We use <strong>Euclidean distance</strong> to measure how close the unknown face is to every known face:
          </p>
          <motion.pre
            whileHover={{ scale: 1.03 }}
            className="bg-gray-100 p-4 rounded text-sm overflow-x-auto"
          >
            <code>distance = √( (x₁ - x₂)² + (y₁ - y₂)² + ... )</code>
          </motion.pre>
          <p>If the result is below a threshold — it’s a match. Boom 💥</p>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">🚀 Why FaceRec?</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li><strong>Privacy First:</strong> Everything runs locally — no cloud needed.</li>
            <li><strong>Real-time Performance:</strong> Recognizes faces in milliseconds.</li>
            <li><strong>Easy to Integrate:</strong> FastAPI backend with clean REST endpoints.</li>
          </ul>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
          className="text-center pt-10"
        >
          <Link href="/recognize">
            <Button
              size="lg"
              className="px-8 hover:scale-105 transition-transform bg-blue-500 text-white"
            >
              Try Face Recognition
            </Button>
          </Link>
        </motion.section>
      </main>
    </>
  )
}