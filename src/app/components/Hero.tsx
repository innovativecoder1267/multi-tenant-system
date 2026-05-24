
"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white px-6 overflow-hidden">
      
      {/* Static Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />
      </div>

      {/* Static Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      
      <div className="max-w-6xl text-center relative z-10">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-800 rounded-full bg-zinc-900/50 backdrop-blur-sm text-gray-300 text-sm font-semibold mb-10"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Multi-Tenant SaaS Platform
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-7xl md:text-9xl font-black leading-[0.95] tracking-tighter"
        >
          <span className="block text-white">
            Building Enterprise-
          </span>
          <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 text-transparent bg-clip-text">
            Grade SaaS
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-400 mt-10 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
        >
          Full-stack development expertise implementing{" "}
          <span className="text-white font-semibold">authentication</span>,{" "}
          <span className="text-white font-semibold">billing systems</span>,{" "}
          <span className="text-white font-semibold">team management</span>, and{" "}
          <span className="text-white font-semibold">API infrastructure</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center gap-5 mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-5 rounded-2xl font-bold text-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2 text-white">
              Explore Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(39, 39, 42, 0.8)" }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-5 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 font-bold text-lg transition-all duration-300"
          >
            View GitHub
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-24 grid grid-cols-3 gap-12 max-w-3xl mx-auto"
        >
          {[
            { label: "Core Features", value: "5+", icon: Zap },
            { label: "Tech Stack", value: "Modern", icon: Sparkles },
            { label: "Architecture", value: "Enterprise", icon: Zap },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
                <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-3" />
                <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-2 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
