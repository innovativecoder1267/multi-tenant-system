"use client"

import { motion } from "framer-motion"

const skills=[
"5+ Core Features",
"Full-Stack Development",
"Modern Tech Stack",
"Enterprise Architecture"
]

export default function Skills(){

return(

<section className="py-28 bg-black text-white">

<h2 className="text-4xl text-center font-bold mb-16">
Technical Skills Demonstrated
</h2>

<div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">

{skills.map((skill,i)=>(

<motion.div
key={i}
whileHover={{scale:1.06}}
className="p-10 rounded-xl border border-white/10 bg-white/5 text-center"
>

{skill}

</motion.div>

))}

</div>

</section>

)
}