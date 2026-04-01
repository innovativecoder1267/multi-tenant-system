 "use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usernamevalidation } from "@/lib/db/validation";
import { useToast } from "../context/Toastcontext";
export default function RegisterPage() {
  const [username,setusername]=useState<string|null>("")
  const [email,setemail]=useState<string|null>("")
  const [password,setpassword]=useState("")
  const [confirmpassword,setconfirmpassword]=useState("")
  const [register,setregister]=useState<boolean>(false)
  const [otp,setotp]=useState("")
  const {showToast}=useToast()
  const router=useRouter();
  async function Handleclick(e:React.FormEvent) {
    e.preventDefault()
    setregister(false)
       if(!username||!password||!confirmpassword||!email)return
      const result= usernamevalidation.safeParse(username)
      if(!result.success){
        showToast("error","username should be checked")
        return
      }
    try {
   
      const res=await axios.post("/api/signup",{
        username,
        email,
        password,
        confirmpassword
      })
        if(res.status==201||res.status==200){
        console.log("Otp is",res.data.otp)
        alert("Success came")
        setotp(res.data.otp)
        router.push(`/verifyotp?email=${email}`)
        setregister(true)
        }
    } catch (error) {
      console.log("Error is",error)
      setregister(false)
    }
  }
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_50%)]" />

      {/* Register Card */}
      <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-2xl shadow-blue-500/10 transition-all duration-300 hover:shadow-blue-500/20">

        {/* Logo + Title */}
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
            Create your account
          </p>

        </div>

        {/* Form */}
        <form onSubmit={Handleclick} className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-sm text-zinc-400">Username</label>
            <input
              type="text"
              onChange={(e)=>setusername(e.target.value)}
              placeholder="yourusername"
              className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              onChange={(e) =>setemail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400">Password</label>
            <input
              type="password"
              onChange={(e) =>setpassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-zinc-400">Confirm Password</label>
            <input
              type="password"
              onChange={(e) =>setconfirmpassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-400 hover:underline cursor-pointer">
              Log in
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
}