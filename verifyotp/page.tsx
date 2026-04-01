  "use client";

  import { useState } from "react";
  import Link from "next/link";
  import { useSearchParams } from "next/navigation";
  import axios from "axios";
  import { useRouter } from "next/navigation";
  export default function VerifyPage() {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const Params=useSearchParams();
    const email=Params.get("email")
    const Router=useRouter();
    if(!email)return
  
    const handleChange = (value: string, index: number) => {
      if (!/^[0-9]?$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    };
  
    async function Handleclick(e:React.FormEvent){
      e.preventDefault();
        if(!otp)return
      const finalotp=otp.join("")
      try {
        const res=await axios.post("/api/verifypage",{
          otp:finalotp,
          email
        })
        if(res.status==200){
          alert("Email verified successfully")
          Router.push("/login")
        }
      } catch (error) {
        console.log("Error is",error)
      }
    }

    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_50%)]" />

        {/* Verify Card */}
        <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-2xl shadow-blue-500/10 transition-all duration-300 hover:shadow-blue-500/20">

          {/* Logo + Title */}
          <div className="flex flex-col items-center mb-8">

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

            <p className="text-zinc-400 text-sm text-center">
              Enter the 6-digit verification code sent to your email
            </p>

          </div>

          {/* OTP Form */}
          <form onSubmit={Handleclick} className="space-y-6">

            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e)=>handleChange(e.target.value,index)}
                  className="w-12 h-12 text-center text-lg bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Verify Account
            </button>

          </form>

          {/* Resend */}
          <p className="text-center text-sm text-zinc-400 mt-4">
            Otp will be shown in console for testing purpose. 
            </p>

          {/* Back to Login */}
          <p className="text-center text-xs text-zinc-500 mt-4">
            Back to{" "}
            <Link href="/login">
              <span className="text-blue-400 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>

        </div>
      </div>
    );
  }