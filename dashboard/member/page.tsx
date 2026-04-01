"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/app/context/Toastcontext";
export default function MembersPage() {
  const {showToast}=useToast()
  const [member,setmembers]=useState([])
  useEffect(()=>{
    async function Fetchmembers(){
      try {
        const res=await axios.get("/api/getmembers")
        if(res.status===200){
           setmembers(res.data[0])
           console.log(res.data[0][0].userId.email);
         }
      } catch (error) {
        console.log("Error is",error);
      }
    }
    Fetchmembers();
  },[])
  
  async function handleremove(userId){
    try {
     const res=await axios.post("/api/removeuser",{
      userId
     })
     if(res.status===200){
      showToast("success","User removed success plz refresh the tab")
    } 
    } catch (error) {
      showToast("error","User removed Failed")
    }
  }
  const roleColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "bg-purple-600/20 text-purple-400";
      case "Admin":
        return "bg-blue-600/20 text-blue-400";
      default:
        return "bg-zinc-700/30 text-zinc-400";
    }
  };
  function copyclipboard(){
    navigator.clipboard.writeText(invitelink)
      showToast("success","User url copied success")
  }
  const [action,setaction]=useState(false)
  const [invitelink,setinvitelink]=useState("")
  async function handleclick(){
    try {
      const res=await axios.post("/api/generateinvitelink")
      if(res.status===200){
      showToast("success","Invite link generation success")
      setinvitelink(res.data.invitelink)
      }
    } catch (error) {
      console.log("ERROR IS",error);
      showToast("error","Error occured in generation")

    }
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Team Members
          </h2>
          <p className="text-zinc-400 mt-2">
            Manage workspace members and their roles.
          </p>
        </div>

        <button
        onClick={()=>setaction(true)}
        className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl text-sm shadow-lg shadow-blue-500/20">
          Invite Member
        </button>
      </div>

      {/* Members Table Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
     {
  action && (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-[420px] shadow-2xl shadow-blue-500/10">

        <h2 className="text-xl font-semibold text-white mb-2">
          Invite Member
        </h2>

        <p className="text-sm text-zinc-400 mb-6">
          Generate a secure invite link to add members to your workspace.
        </p>

        {/* Invite Link */}
        <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3">

          <input
            type="text"
            value={invitelink}
            readOnly
            className="bg-transparent flex-1 text-sm text-zinc-300 outline-none"
          />

          <button
          onClick={copyclipboard}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-1.5 rounded-lg text-sm font-medium"
          >
            Copy
          </button>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setaction(false)}
            className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
          >
            Cancel
          </button>

          <button
          onClick={handleclick}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Generate Link
          </button>

        </div>

      </div>
    </div>
  )
}
        {/* Table Header */}
        <div className="grid grid-cols-4 text-sm text-zinc-500 pb-4 border-b border-zinc-800">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Members Rows */}
        <div className="divide-y divide-zinc-800">
          {member.map((members, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center py-4 text-sm hover:bg-zinc-950/60 transition rounded-lg"
            >
              <span className="font-medium">{members.userId.username}</span>
              <span className="text-zinc-400">{members.userId.email}</span>

              <span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${roleColor(
                    members.role
                  )}`}
                >
                  {members.role}
                </span>
              </span>

              <div className="flex justify-end gap-4 text-sm">
                <button
                className="text-blue-400 hover:underline">
                </button>
                <button
                onClick={()=>handleremove(members.userId._id)}
                className="text-red-400 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}