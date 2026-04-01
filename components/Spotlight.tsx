"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

export default function Spotlight() {

const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)

const smoothX = useSpring(mouseX,{ stiffness:60, damping:20 })
const smoothY = useSpring(mouseY,{ stiffness:60, damping:20 })

useEffect(()=>{

const move = (e:MouseEvent)=>{
mouseX.set(e.clientX)
mouseY.set(e.clientY)
}

window.addEventListener("mousemove",move)

return ()=>window.removeEventListener("mousemove",move)

},[])

return(

<div className="pointer-events-none absolute inset-0 overflow-hidden">

{/* Mouse spotlight */}

<motion.div
style={{
left:smoothX,
top:smoothY
}}
className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full
bg-[radial-gradient(circle,rgba(59,130,246,0.35)_0%,rgba(56,189,248,0.25)_30%,transparent_70%)]
blur-[90px]"
/>

{/* Blue ambient glow */}

<motion.div
animate={{
x:[0,120,-120,0],
y:[0,-80,80,0]
}}
transition={{
duration:25,
repeat:Infinity,
ease:"easeInOut"
}}
className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-blue-500/20 blur-[180px] rounded-full"
/>

{/* Cyan ambient glow */}

<motion.div
animate={{
x:[0,-150,150,0],
y:[0,120,-120,0]
}}
transition={{
duration:30,
repeat:Infinity,
ease:"easeInOut"
}}
className="absolute bottom-[-20%] right-[10%] w-[800px] h-[800px] bg-cyan-400/20 blur-[180px] rounded-full"
/>

{/* Purple accent glow */}

<motion.div
animate={{
x:[0,80,-80,0],
y:[0,60,-60,0]
}}
transition={{
duration:35,
repeat:Infinity,
ease:"easeInOut"
}}
className="absolute top-[30%] left-[40%] w-[600px] h-[600px] bg-purple-500/15 blur-[160px] rounded-full"
/>

{/* Dark vignette */}

<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]"/>

</div>

)

}