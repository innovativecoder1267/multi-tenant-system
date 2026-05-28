
"use client"

import { Shield, CreditCard, Users, Briefcase, Key } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "Easy Login",
    desc: "Simple and secure login with Google, OTP, and email access",
    color: "cyan",
    border: "border-cyan-500/20",
    glow: "group-hover:shadow-cyan-500/20"
  },
  {
    icon: CreditCard,
    title: "Payments",
    desc: "Handle subscriptions and payments without extra setup hassle",
    color: "purple",
    border: "border-purple-500/20",
    glow: "group-hover:shadow-purple-500/20"
  },
  {
    icon: Users,
    title: "Team Access",
    desc: "Add your team members and manage who can access what",
    color: "green",
    border: "border-green-500/20",
    glow: "group-hover:shadow-green-500/20"
  },
  {
    icon: Briefcase,
    title: "Workspaces",
    desc: "Keep projects organized separately for clients or teams",
    color: "orange",
    border: "border-orange-500/20",
    glow: "group-hover:shadow-orange-500/20"
  },
  {
    icon: Key,
    title: "API Keys",
    desc: "Create and manage API keys whenever you need them",
    color: "indigo",
    border: "border-indigo-500/20",
    glow: "group-hover:shadow-indigo-500/20"
  }
]

export default function Features() {
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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const
    }
    }
  }

  return (
    <section className="py-40 bg-black text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-cyan-400 text-sm font-bold mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            FEATURES
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            Built for Everyday Use
          </h2>

          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Everything you need to manage your product smoothly
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`group relative p-8 rounded-3xl border ${feature.border} bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-900/50 transition-all duration-500 ${feature.glow} shadow-2xl`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 mb-6`}>
                  <Icon size={28} className={`text-${feature.color}-400`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-base">
                  {feature.desc}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-cyan-400 transition-colors">
                  Explore
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* Accent */}
                <div className={`absolute top-4 right-4 w-20 h-20 bg-${feature.color}-500/5 rounded-full blur-2xl`} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
