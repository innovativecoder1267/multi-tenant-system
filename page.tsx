import { div } from "framer-motion/client";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Features from "./components/Features";
import Testimonials from "./components/Testimonals";
import Spotlight from "./components/Spotlight";
 export default function Home(){
  return (
    <div>
  <main className="bg-black">
   
<Navbar/>
<Hero/>
<Spotlight/>

<Features/>

<Skills/>

<Testimonials/>

<Footer/>

</main>

    </div>
  )
}