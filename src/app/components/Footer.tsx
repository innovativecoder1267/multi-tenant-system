"use client"

import Link from "next/link"
import { motion } from "framer-motion"
const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Documentation", href: "/docs" },
    { name: "Changelog", href: "/changelog" },
    { name: "Roadmap", href: "/roadmap" }
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Guides", href: "/guides" },
    { name: "Examples", href: "/examples" },
    { name: "Community", href: "/community" },
    { name: "API Reference", href: "/api" }
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" }
  ]
}

const socialLinks = [
  { name: "GitHub", href: "https://github.com" },
  { name: "Twitter", href: "https://twitter.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Email", href: "mailto:hello@tenantstack.com" }
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black text-gray-400 overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="py-20 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text mb-6"
            >
              ⚡ TenantStack
            </motion.div>

            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              The fastest way to build production-ready multi-tenant SaaS applications with enterprise-grade features.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3">
                Stay updated
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white mb-6 font-bold text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link.name}
                   </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white mb-6 font-bold text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link.name}
                   </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white mb-6 font-bold text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link.name}
                   </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <p className="text-sm">
            © 2026 TenantStack. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
  
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
