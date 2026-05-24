"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at DataFlow",
    text: "TenantStack saved us 6 months of development time. The architecture is rock-solid and scales beautifully.",
    avatar: "SC",
    rating: 5,
    company: "DataFlow",
    color: "cyan"
  },
  {
    name: "Michael Rodriguez",
    role: "VP Engineering",
    text: "Workspace management is incredibly robust. We've deployed this for over 50 enterprise clients without any issues.",
    avatar: "MR",
    rating: 5,
    company: "TechCorp",
    color: "blue"
  },
  {
    name: "Emily Thompson",
    role: "Founder at MetricsPro",
    text: "API key management works flawlessly. The analytics dashboard gives us exactly what we need to monitor usage.",
    avatar: "ET",
    rating: 5,
    company: "MetricsPro",
    color: "purple"
  }
]

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="py-40 bg-black text-white relative">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/10 via-black to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
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
            TESTIMONIALS
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            What Developers Say
          </h2>
          
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto">
            Trusted by engineering teams at leading companies
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={64} className="text-cyan-400" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${testimonial.color}-500 to-${testimonial.color}-600 flex items-center justify-center font-bold text-white shadow-lg`}>
                  {testimonial.avatar}
                </div>

                <div>
                  <div className="font-bold text-white text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-cyan-400 font-semibold mt-1">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Corner Glow */}
              <div className={`absolute top-4 right-4 w-20 h-20 bg-${testimonial.color}-500/5 rounded-full blur-2xl`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 grid grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "50+", label: "Enterprise Clients" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "24/7", label: "Support" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm text-center"
            >
              <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-3">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
