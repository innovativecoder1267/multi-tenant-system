"use client"

import { Shield, CreditCard, Users, Briefcase, Key } from "lucide-react"
import { motion } from "framer-motion"

const features = [
{
icon:Shield,
title:"Authentication",
desc:"Complete auth system with SSO, 2FA, magic links, and social logins."
},
{
icon:CreditCard,
title:"Billing & Subscriptions",
desc:"Stripe integration with subscription management and invoicing."
},
{
icon:Users,
title:"Team Collaboration",
desc:"Invite team members with role-based access control."
},
{
icon:Briefcase,
title:"Workspace Management",
desc:"Multi-tenant workspaces with complete data isolation."
},
{
icon:Key,
title:"API Key Management",
desc:"Generate, rotate and manage API keys with usage analytics."
}
]

export default function Features(){

return(

<section className="py-28 bg-black text-white">

<h2 className="text-4xl font-bold text-center mb-16">
Everything You Need
</h2>

<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">

{features.map((feature,i)=>{

const Icon = feature.icon

return(

<motion.div
key={i}
whileHover={{y:-10}}
className="group p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-yellow-400/40 transition"
>

<div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 mb-6">
<Icon size={22}/>
</div>

<h3 className="text-xl font-semibold mb-3">
{feature.title}
</h3>

<p className="text-gray-400">
{feature.desc}
</p>

<p className="mt-6 text-sm text-gray-400 group-hover:text-white transition">
Learn more →
</p>

</motion.div>

)

})}

</div>

</section>

)

}