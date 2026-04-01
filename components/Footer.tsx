import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer(){

return(

<footer className="border-t border-white/10 bg-black text-gray-400">

<div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">

<div>
<h3 className="text-white text-xl font-semibold mb-4">
⚡ TenantStack
</h3>

<p className="text-sm">
The fastest way to build production-ready multi-tenant SaaS applications.
</p>
</div>

<div>
<h4 className="text-white mb-4 font-semibold">
Product
</h4>

<ul className="space-y-2">
<li>Features</li>
<li>Pricing</li>
<li>Documentation</li>
<li>Changelog</li>
</ul>
</div>

<div>
<h4 className="text-white mb-4 font-semibold">
Resources
</h4>

<ul className="space-y-2">
<li>Blog</li>
<li>Guides</li>
<li>Examples</li>
<li>Community</li>
</ul>
</div>

<div>
<h4 className="text-white mb-4 font-semibold">
Company
</h4>

<ul className="space-y-2">
<li>About</li>
<li>Contact</li>
<li>Privacy</li>
<li>Terms</li>
</ul>
</div>

</div>

<div className="max-w-7xl mx-auto px-6 pb-10 flex justify-between items-center">

<p>© 2026 TenantStack. All rights reserved.</p>

<div className="flex gap-4">

<div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
<Github size={18}/>
</div>

<div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
<Twitter size={18}/>
</div>

<div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
<Linkedin size={18}/>
</div>

</div>

</div>

</footer>

)

}