"use client";
 import { useState } from "react";
import { useToast } from "@/app/context/Toastcontext";
import axios from "axios";
export default function SettingsPage() {
    const [newpass,setnewpass]=useState()
    const [confirmpass,setconfirmpass]=useState()
    const {showToast}=useToast()
    const [workspacename,setworkspacename]=useState("")
 
  const Handleworkspacechange=async()=>{
    if(!workspacename)return;
    try {
      const res=await axios.post("/api/changeworkspace",{
        workspacename
      })
      if(res.status===200){
        showToast("success","Workspace changed")
      }
    } catch (error) {
      console.log("Error is",error)
      showToast("error","Changing failure in workspace")
    }
  }

  async function handlechangepassword(){
    try {
      const api=await axios.post("/api/changepassword",{
        newpass,
        confirmpass
      })
      if(api.status===200){
        showToast("success","Password has been updated success")
      }
    } catch (error) {
      console.log("Error is",error);
      showToast("error","error occured in changing the pass")
    }
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Settings
        </h2>
        <p className="text-zinc-400 mt-2">
          Manage your account and workspace preferences.
        </p>
      </div>

 

      {/* Workspace Settings */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 transition hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] space-y-6">
        <h3 className="text-xl font-semibold">Workspace Settings</h3>

        <div>
          <label className="text-sm text-zinc-400">Workspace Name</label>
          <input
          onChange={(e) =>setworkspacename(e.target.value)}
            className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="My SaaS Workspace"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Timezone</label>
          <select className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500">
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
          </select>
        </div>

        <button
        onClick={Handleworkspacechange}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-xl text-sm shadow-lg shadow-blue-500/20">
          Update Workspace
        </button>
      </div>

      {/* Security Settings */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 transition hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] space-y-6">
        <h3 className="text-xl font-semibold">Security</h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-zinc-400">New Password</label>
            <input
              type="password"
              onChange={(e)=>setnewpass(e.target.value)}
              className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Confirm Password</label>
            <input
              type="password"
              onChange={(e)=>setconfirmpass(e.target.value)}
              className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
        onClick={handlechangepassword}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-xl text-sm shadow-lg shadow-blue-500/20">
          Change Password
        </button>
      </div>

      </div>
 
  );
}