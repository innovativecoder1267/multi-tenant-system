"use client"

import { motion } from "framer-motion"
export default function Hero() {

return(

<section className="relative min-h-screen flex items-center justify-center bg-black text-white px-6">


<div className="max-w-4xl text-center relative z-10">
<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="px-4 py-1 border border-white/10 rounded-full inline-block text-gray-300"
>
Demo: Multi-Tenant SaaS Platform
</motion.div>

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="text-5xl md:text-7xl font-bold mt-6"
>

Building Enterprise-Grade

<span className="block bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
SaaS Solutions
</span>

</motion.h1>

<p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
A showcase of my full-stack development expertise implementing authentication, billing systems, team management and API infrastructure.
</p>

<div className="flex justify-center gap-4 mt-10">

<motion.button
whileHover={{scale:1.05}}
className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400"
>
Explore Demo
</motion.button>

<button className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition">
View Github
</button>

</div>

</div>

</section>

)
}