"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams,useRouter } from "next/navigation"

type InviteStatus="checking"|"ready"|"joining"|"success"|"error"

export default function InvitePage() {
  const params=useSearchParams();
  const token=params.get("token")
  const [status, setStatus] = useState<InviteStatus>("checking")
  const [message,setMessage]=useState("Checking invite link...")
  const [workspaceName,setWorkspaceName]=useState("this workspace")
  const router=useRouter()
  const invitePath=useMemo(()=>token?`/invite?token=${token}`:"/invite",[token])
  const authCallback=encodeURIComponent(invitePath)

useEffect(() => {
  async function checkInvite() {
    if (!token) {
      setStatus("error")
      setMessage("Invite token is missing.")
      return
    }

    try {
      const res=await axios.get(`/api/acceptinvite?token=${token}`)
      setWorkspaceName(res.data.workspaceName||"this workspace")
      setStatus("ready")
      setMessage("You were invited to join this workspace.")
    } catch (error) {
      const message=axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined
      setStatus("error")
      setMessage(message||"This invite link is invalid or expired.")
    }
  }

  checkInvite()
}, [token]);

async function joinWorkspace(){
  if(!token){
    setStatus("error")
    setMessage("Invite token is missing.")
    return
  }

  try {
    setStatus("joining")
    setMessage("Joining workspace...")
    const res=await axios.post("/api/acceptinvite", {token});
    if (res.status === 200) {
      setStatus("success");
      setMessage("You have successfully joined the workspace.")
      setTimeout(()=>router.push("/dashboard"),1200)
    }
  } catch (err) {
    if(axios.isAxiosError(err)&&err.response?.status===401){
      router.push(`/login?callbackUrl=${authCallback}`)
      return
    }
    const message=axios.isAxiosError(err)
      ? err.response?.data?.message
      : undefined
    setStatus("error");
    setMessage(message||"This invite link is invalid or expired.")
  }
}

  return (

    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

      <div className="w-[420px] bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl shadow-blue-500/10 text-center">

        <div className="flex justify-center mb-6">
          <img
            src="/saas.png"
            alt="logo"
            className="h-10 w-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
          />
        </div>

        {(status === "checking" || status === "joining") && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>

            <h2 className="text-xl font-semibold">
              {status==="joining"?"Joining Workspace":"Checking Invitation"}
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              {message}
            </p>
          </>
        )}

        {status === "ready" && (
          <>
            <h2 className="text-xl font-semibold">
              Join {workspaceName}
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              Accept this invite to join as a member.
            </p>

            <button
              onClick={joinWorkspace}
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 mt-6"
            >
              Join Workspace
            </button>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <Link
                href={`/login?callbackUrl=${authCallback}`}
                className="bg-zinc-800 hover:bg-zinc-700 transition py-2 rounded-xl text-sm"
              >
                Log in
              </Link>
              <Link
                href={`/register?callbackUrl=${authCallback}`}
                className="bg-zinc-800 hover:bg-zinc-700 transition py-2 rounded-xl text-sm"
              >
                Sign up
              </Link>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-green-400">
              Workspace Joined
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              {message} Redirecting to dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-400">
              Invalid Invite
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              {message}
            </p>
          </>
        )}

      </div>

    </div>
  )
}
