"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
 import { useRouter } from "next/navigation";
import { useToast } from "../context/Toastcontext";
export default function LoginPage() {
    const [email,setemail]=useState<string>("")
    const [password,setpasword]=useState("")
    const {showToast}=useToast();
     const router=useRouter();
   async function handleclick(e:React.FormEvent){
    e.preventDefault();
        try {
         const res=await signIn('credentials',{
            email,
            password,
            redirect:false
         })
         if(res?.status===200){
            setTimeout(() => {
           router.push("/dashboard")
            }, 3000);
          showToast("success","User logged in success")

         }
        } catch (error:any) {
            console.log("Error is",error?.message)
            showToast("error","Error occured in login")
        }
    }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden">

       <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_50%)]" />

       <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-2xl shadow-blue-500/10 transition-all duration-300 hover:shadow-blue-500/20">

         <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/saas.png"
              alt="logo"
              className="h-10 w-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              SaaS Starter
            </h1>
          </div>

          <p className="text-zinc-400 text-sm">
            Welcome Back
          </p>

        </div>

         <form onClick={handleclick} className="space-y-5">

          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              onChange={(e)=>setemail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Password</label>
            <input
              type="password"
               onChange={(e)=>setpasword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

           <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            Log In
          </button>

           <div className="flex items-center gap-3 text-zinc-500 text-xs">
            <div className="flex-1 h-px bg-zinc-800" />
            Or continue with
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

     

        </form>

         <p className="text-center text-xs text-zinc-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/register">
            <span className="text-blue-400 hover:underline cursor-pointer">
              Sign up
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
}