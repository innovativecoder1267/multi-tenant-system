"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams,useRouter } from "next/navigation"
export default function InvitePage() {
  const params=useSearchParams();
  const token=params.get("token")
  const [status, setStatus] = useState("verifying")
  const router=useRouter()
  useEffect(() => {
    async function verifyInvite() {
        const res=await axios.post("/api/acceptinvite",{
            token
        })
        if(res.status===200){
            setStatus("success")
            router.push("dashboard/member")
            alert("User verified")
        }
        if(res.status===401){
            alert("Plz login first")
            setStatus("Error")
            router.push("/login")
        }
    }
    verifyInvite()
  }, [params.token])

  return (

    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

      {/* Card */}
      <div className="w-[420px] bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl shadow-blue-500/10 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/saas.png"
            alt="logo"
            className="h-10 w-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
          />
        </div>

        {/* Verifying */}
        {status === "verifying" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>

            <h2 className="text-xl font-semibold">
              Verifying Invitation
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              Please wait while we verify your invite link.
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-green-400">
              Invitation Accepted
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              You have successfully joined the workspace.
              Redirecting to dashboard...
            </p>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-400">
              Invalid Invite
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              This invite link is invalid or expired.
            </p>
          </>
        )}

      </div>

    </div>
  )
}