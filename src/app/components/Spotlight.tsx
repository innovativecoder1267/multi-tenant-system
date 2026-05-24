"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function Spotlight() {
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 25 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 25 })

  useEffect(() => {
    setMounted(true)

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", move)

    return () => window.removeEventListener("mousemove", move)
  }, [mouseX, mouseY])

  // Prevent SSR hydration mismatch
  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      
      {/* Mouse spotlight - Enhanced */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        className="absolute w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full
        bg-[radial-gradient(circle,rgba(59,130,246,0.4)_0%,rgba(56,189,248,0.3)_25%,rgba(168,85,247,0.2)_50%,transparent_75%)]
        blur-[100px]"
      />

      {/* Blue ambient glow - Slower, larger */}
      <motion.div
        animate={{
          x: [0, 150, -150, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-25%] left-[5%] w-[1000px] h-[1000px] bg-blue-500/25 blur-[200px] rounded-full"
      />

      {/* Cyan ambient glow - Opposite movement */}
      <motion.div
        animate={{
          x: [0, -180, 180, 0],
          y: [0, 150, -150, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-25%] right-[5%] w-[1000px] h-[1000px] bg-cyan-400/25 blur-[200px] rounded-full"
      />

      {/* Purple accent glow - Diagonal movement */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 80, -80, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[35%] left-[45%] w-[800px] h-[800px] bg-purple-500/20 blur-[180px] rounded-full"
      />

      {/* Additional pink accent */}
      <motion.div
        animate={{
          x: [0, -120, 120, 0],
          y: [0, -90, 90, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[60%] right-[30%] w-[700px] h-[700px] bg-pink-500/15 blur-[170px] rounded-full"
      />

      {/* Dark vignette - Enhanced edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_50%,black_80%)]" />
      
      {/* Additional subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
