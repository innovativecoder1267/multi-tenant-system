
"use client"

import { motion } from "framer-motion"
import { Code2, Layers, Zap, Building2 } from "lucide-react"

const skills = [
  {
    icon: Code2,
    title: "5+ Core Features",
    description: "Auth, billing, workspaces, API keys, team management"
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    description: "Next.js, TypeScript, Tailwind, modern tooling"
  },
  {
    icon: Zap,
    title: "Modern Tech Stack",
    description: "Cutting-edge technologies and best practices"
  },
  {
    icon: Building2,
    title: "Enterprise Architecture",
    description: "Scalable, secure, production-ready infrastructure"
  }
]

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="py-40 bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-purple-400 text-sm font-bold mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            TECHNICAL EXPERTISE
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            Skills Demonstrated
          </h2>
          
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto">
            A comprehensive showcase of modern development capabilities
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, i) => {
            const Icon = skill.icon

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-purple-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white">
                  {skill.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {skill.description}
                </p>

                {/* Corner Glow */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/5 rounded-full blur-2xl" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-gray-300">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
            </div>
            <span className="text-sm font-semibold">All systems operational and production-ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
