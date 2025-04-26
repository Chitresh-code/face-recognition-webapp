"use client"

import { useEffect, useState } from "react"
import { AddPersonModal } from "@/components/persons/AddPersonModal"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { motion } from "framer-motion"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface Person {
  name: string
  trained: boolean
}

export default function PersonsPage() {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(false)
  const [cardView, setCardView] = useState(true)
  const [trainingPerson, setTrainingPerson] = useState<string | null>(null)

  useEffect(() => {
    fetchPersons()
  }, [])

  async function fetchPersons() {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/person/`)
      const data = await response.json()
      setPersons(data)
    } catch (error) {
      console.error("Error fetching persons:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleTrain(name: string) {
    setTrainingPerson(name)
    try {
      const response = await fetch(`${API_URL}/person/train/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person_name: name }),
      })
      if (response.ok) {
        alert(`Model trained for ${name} ✅`)
        fetchPersons()
      } else {
        alert("Failed to train.")
        console.error(await response.text())
      }
    } catch (error) {
      console.error("Error training model:", error)
    } finally {
      setTrainingPerson(null)
    }
  }

  async function handleDelete(name: string) {
    if (!confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) return

    try {
      const formData = new FormData()
      formData.append("person_name", name)

      const response = await fetch(`${API_URL}/person/`, {
        method: "DELETE",
        body: formData,
      })

      if (response.ok) {
        alert(`Deleted ${name} ✅`)
        fetchPersons()
      } else {
        alert("Failed to delete.")
        console.error(await response.text())
      }
    } catch (error) {
      console.error("Error deleting person:", error)
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Persons</h1>
            <p className="text-gray-600 text-sm mt-1">Register persons, upload their images, train or delete as needed.</p>
          </div>

          <div className="flex items-center gap-4">
            <AddPersonModal onPersonAdded={fetchPersons} />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Cards</span>
              <Switch checked={cardView} onCheckedChange={setCardView} />
              <span className="text-sm text-gray-600">Table</span>
            </div>
          </div>
        </div>

        {/* Persons List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading persons...</p>
        ) : (
          <>
            {cardView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {persons.map((person, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="cursor-pointer"
                  >
                    <Card className="border border-gray-200 shadow-sm hover:shadow-lg transition">
                      <CardContent className="p-6 flex flex-col gap-4">
                        <h2 className="text-xl font-semibold">{person.name}</h2>
                        <p className="text-sm text-gray-600">{person.trained ? "✅ Trained" : "❌ Not Trained"}</p>

                        <div className="flex flex-col gap-2 mt-4">
                          <Link href={`/persons/${encodeURIComponent(person.name)}/upload`}>
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Upload Images</Button>
                          </Link>
                          <Button
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            disabled={person.trained || trainingPerson === person.name}
                            onClick={() => handleTrain(person.name)}
                          >
                            {trainingPerson === person.name ? "Training..." : person.trained ? "Already Trained" : "Train Model"}
                          </Button>
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => handleDelete(person.name)}
                          >
                            Delete Person
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg shadow-sm text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {persons.map((person, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-3">{person.name}</td>
                        <td className="p-3">{person.trained ? "✅ Trained" : "❌ Not Trained"}</td>
                        <td className="p-3 flex flex-col sm:flex-row justify-center gap-2">
                          <Link href={`/persons/${encodeURIComponent(person.name)}/upload`}>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Upload</Button>
                          </Link>
                          <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            disabled={person.trained || trainingPerson === person.name}
                            onClick={() => handleTrain(person.name)}
                          >
                            {trainingPerson === person.name ? "Training..." : "Train"}
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(person.name)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </>
  )
}