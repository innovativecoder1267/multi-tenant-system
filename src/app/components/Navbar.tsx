"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const navLinks = [
    { name: "Features", href: "/Features" },
    { name: "Benefits", href: "/benefits" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/documentation" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full border-b border-zinc-800/50 backdrop-blur-2xl bg-black/90 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        
        {/* Logo */}z
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-black tracking-tight cursor-pointer flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-sm" />
            </div>
            <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              TenantStack
            </span>
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-gray-400 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative py-2"
            >
              <motion.span
                animate={{
                  color: hoveredLink === link.name ? "#ffffff" : "#9ca3af"
                }}
                transition={{ duration: 0.3 }}
              >
                {link.name}
              </motion.span>
              
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-gray-300 hover:text-white transition-colors duration-300 font-medium px-6 py-2.5 rounded-xl hover:bg-zinc-900/50"
            >
              Sign In
            </motion.button>
          </Link>
          
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-6 py-2.5 rounded-xl font-semibold overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-white">Get Started</span>
            </motion.button>
          </Link>                                                 
        </div>  
      </div>                                                          
    </motion.nav>
  )                                               
}             
