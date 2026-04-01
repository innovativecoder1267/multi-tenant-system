"use client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function DashboardPage() {
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [activeMembers, setActiveMembers] = useState(0);
  const [apiUsage, setApiUsage] = useState("0%");
  const [workspaceData, setWorkspaceData] = useState([])
  const [action,setaction]=useState<string>("")
  const router=useRouter();
  useEffect(()=>{
    const fetchdata=async()=>{
      const res=await axios.get("/api/dashboard")
      if(res?.data){
        setCurrentPlan(res.data.currentPlan.subscribedPlan)
        setActiveMembers(res.data.activeMembers)
        setApiUsage(res.data.apiUsage)
      }
    }
    fetchdata();
  }, [])
  useEffect(()=>{
    if(!action)return;
    if(action==="Generate API Key"){
      router.push("/dashboard/api-key")
    }
  },[action])
  useEffect(()=>{
    const fetchdata=async()=>{
      const res=await axios.get("/api/getworkspacedata")
      if(res?.data){
        console.log("Workspace data is",res.data.workspaceData)
        setWorkspaceData(res.data.workspaceData)
      }
    }
    fetchdata();
  }, [])
  useEffect(()=>{
    if(!action)return
    if(action==="View Billing"){
      router.push("/dashboard/billing")
    }
    if(action==="Invite Team Member"){
      router.push("/dashboard/member")
    }
  },[action])
  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-zinc-400 mt-2">
            Monitor your workspace activity and manage subscription.
          </p>
        </div>
        <Link href="/dashboard/billing">
        <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl text-sm shadow-lg shadow-blue-500/20">
          Upgrade Plan
        </button>
        </Link>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { title: "Current Plan", value: `${currentPlan}`},
          { title: "Active Members", value: `${activeMembers? activeMembers:"0"}` },
          { title: "API Usage", value: `${apiUsage? apiUsage:"0%"}` },
        ].map((stat) => (
          <div
            key={stat.title}
            className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
          >
            <p className="text-zinc-400 text-sm">{stat.title}</p>
            <h3 className="text-2xl font-semibold mt-2 group-hover:text-blue-400 transition">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Usage Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">

        <h3 className="text-xl font-semibold">
          Usage Statistics
        </h3>

        <div className="grid grid-cols-2 gap-6">

          {/* Requests */}
          <div className="group bg-zinc-950 border border-zinc-800 rounded-xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <p className="text-zinc-400 text-sm">Requests This Month</p>
            <h4 className="text-2xl font-semibold mt-2 group-hover:text-blue-400">
            {workspaceData? workspaceData.requestCount:"0"}
            </h4>
            <div className="mt-4 h-24 rounded-xl bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent" />
          </div>

          {/* Storage */}
          <div className="group bg-zinc-950 border border-zinc-800 rounded-xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <p className="text-zinc-400 text-sm">Storage Used</p>
            <h4 className="text-2xl font-semibold mt-2 group-hover:text-blue-400">
              {workspaceData? workspaceData.storageUsed:"0"} GB
            </h4>
            <div className="mt-4 h-24 rounded-xl bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent" />
          </div>

        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">

        {[
          "Invite Team Member",
          "Generate API Key",
          "View Billing"
        ].map((action) => (
          <div
            key={action}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:-translate-y-1"
          >
            <h4 onClick={()=>setaction(action)} className="font-medium">{action}</h4>
            <p className="text-zinc-500 text-sm mt-2">
              Quickly access this feature.
            </p>
          </div>
        ))}

      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-6">
          Recent Activity
        </h3>

        <div className="space-y-4">
          {[
            "New member invited",
            "Subscription upgraded to Pro",
            "New API key generated",
          ].map((activity, i) => (
            <div
              key={i}
              className="flex justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-4 hover:border-blue-500 transition"
            >
              <p className="text-sm text-zinc-300">{activity}</p>
              <span className="text-xs text-zinc-500">2h ago</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}