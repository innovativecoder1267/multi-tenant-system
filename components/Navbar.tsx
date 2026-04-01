"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b border-white/10 backdrop-blur bg-black/60 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="text-xl font-bold">
          TenantStack
        </div>

        <div className="flex gap-8 text-gray-400">

          <Link href="/Features" className="hover:text-white transition">
            Features
          </Link>

          <Link href="/benefits" className="hover:text-white transition">
            Benefits
          </Link>

          <Link href="/pricing" className="hover:text-white transition">
            Pricing
          </Link>

          <Link href="/docs" className="hover:text-white transition">
            Docs
          </Link>

        </div>

        <div className="flex gap-4">
            <Link href="/login"> 
             <button className="text-gray-300">Sign In</button>
             </Link>
        <Link href="/register">          
        <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600">
            Get Started
          </button>
          </Link>

        </div>

      </div>
    </nav>
  )
}