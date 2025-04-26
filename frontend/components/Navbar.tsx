"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/persons", label: "Manage" },
    { href: "/recognize", label: "Recognize" },
  ]

  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <span role="img" aria-label="logo">👁️‍🗨️</span> FaceRec
        </h1>
        <nav className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "px-4 py-2 rounded text-sm font-medium transition",
                pathname === link.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}