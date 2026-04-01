"use client"

import { motion } from "framer-motion"

const testimonials=[
{
name:"Sarah Chen",
role:"CTO at DataFlow",
text:"TenantStack saved us 6 months of development time."
},
{
name:"Michael Rodriguez",
role:"VP Engineering",
text:"Workspace management is incredibly robust."
},
{
name:"Emily Thompson",
role:"Founder at MetricsPro",
text:"API key management works flawlessly."
}
]

export default function Testimonials(){

return(

<section className="py-28 bg-black text-white">

<h2 className="text-4xl text-center font-bold mb-16">
What Developers Say
</h2>

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

{testimonials.map((t,i)=>(

<motion.div
key={i}
whileHover={{y:-10}}
className="p-8 rounded-2xl border border-white/10 bg-white/5"
>

<p className="text-gray-300 mb-6">
"{t.text}"
</p>

<div className="font-semibold">
{t.name}
</div>

<div className="text-sm text-gray-400">
{t.role}
</div>

</motion.div>

))}

</div>

</section>

)
}