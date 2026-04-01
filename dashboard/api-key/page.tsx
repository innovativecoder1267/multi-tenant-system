"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/app/context/Toastcontext";
export default function ApiKeysPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const {showToast}=useToast()
  const [generateKey, setGenerateKey] = useState(false);
  const [name,setName]=useState("")
  const [showkey,setshowkey]=useState(false)
  type ApiKey = {
  _id: string
  name: string
  key: string
  createdAt: string
  isActive: boolean
}
  const [apikeydata,setapikeydata]=useState<ApiKey[]>([])
 
  const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast("success","Api key copied success")
    setTimeout(() => {
    setshowkey(false)
    }, 3000 );
  } catch (error) {
    console.error("Copy failed:", error);
    showToast("error","Error occured in copy the link")
  }
};
  async function handlerevoke(itemid:string){
    try {
      const res=await axios.post("/api/revokeapikey",{itemid})
      if(res.status===200){
        setapikeydata(prev=>prev.filter(item=>item._id!==itemid))
      }
    } catch (error) {
      console.log("ERROR IS",error);
    }
  }


  async function fetchApiKeys() {
    if(!name)return;
    try {
      const res=await axios.post("/api/generateapikey",{
        name
      })
      if(res.status===200){
      showToast("success","Api key generated success")
        setshowkey(true)
       }
    } catch (error) {
      console.error("Error generating API key:", error);
      showToast("error","Api key copied Failed")
    }
  }
  useEffect(()=>{
      const fetchdata=async()=>{
        const res=await axios.get("/api/getapikeydata")
        if(res.status===200||res.data){
          setapikeydata(res.data.apiKeys)
        }
      }
      fetchdata();
  },[])
  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            API Keys
          </h2>
          <p className="text-zinc-400 mt-2">
            Manage and secure your API access tokens.
          </p>
        </div>

        <button
        onClick={()=>setGenerateKey(true)}
        className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl text-sm shadow-lg shadow-blue-500/20">
          Generate New Key
        </button>
      </div>

      {/* Keys Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">

        <div className="grid grid-cols-4 text-sm text-zinc-500 pb-4 border-b border-zinc-800">
          <span>Name</span>
          <span>Key</span>
          <span>Created</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-zinc-800">

  {apikeydata.map((item) => (
  <div
    key={item._id}
    className="grid grid-cols-4 items-center py-4 text-sm hover:bg-zinc-950/60 transition rounded-lg"
  >
    <span className="font-medium">{item.name}</span>

    <span className="font-mono text-zinc-400 truncate">
      {item.key.slice(0, 12)}••••••••••
      {item.isActive ? "" : " revoked"}
    </span>

    <span className="text-zinc-400">
      {new Date(item.createdAt).toLocaleDateString()}
    </span>

    <div className="flex justify-end gap-4">
   

      <button onClick={()=>handlerevoke(item._id)} className="text-red-400 hover:underline">
        Revoke
      </button>
    </div>
  </div>
))}
        </div>
      </div>
  {
  generateKey && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 w-full max-w-md shadow-2xl shadow-blue-500/10">

        {/* Heading */}
        <h3 className="text-xl font-semibold mb-2 text-white">
          Generate New API Key
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          Create a secure API key to access your workspace programmatically.
        </p>

        {/* Input */}
        <div className="space-y-2 mb-6">
          <label className="text-sm text-zinc-400">Key Name</label>
          <input
            type="text"
            onChange={(e)=>setName(e.target.value)}
            placeholder="Example: Production Server"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>

        {showkey && (
  <div className="mt-4 bg-green-500/10    p-4 flex items-center justify-between  gap-4">

    <div className="flex flex-col">
      <p className="text-green-400 text-sm font-medium">
        API key generated successfully
      </p>

      <p className="text-zinc-300 text-sm mt-1">
        Please copy it now. You won’t be able to see it again.
      </p>

      {apikeydata.length > 0 && (
        <span className="font-mono text-green-300 text-sm mt-2 bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800 inline-block">
      {apikeydata[0]?.key?.slice(0,6)}••••••••••••••{apikeydata[0]?.key?.slice(-5)}
        </span>
      )}
    </div>

    {apikeydata.length > 0 && (
      <button
        onClick={() => copyToClipboard(apikeydata[0].key, "new")}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 transition text-sm rounded-lg shadow-md shadow-green-500/20"
      >
        Copy
      </button>
    )}

  </div>
)}

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            onClick={() => setGenerateKey(false)}
            className="px-4 py-2 rounded-xl text-sm border border-zinc-700 hover:bg-zinc-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={fetchApiKeys}
            className="px-4 py-2 rounded-xl text-sm bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
          >
            Generate Key
          </button>
        </div>
      </div>
    </div>

  )
}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-sm text-zinc-400">
        <p>
          ⚠ Keep your API keys secure. Do not expose them in public repositories or client-side code.
        </p>
      </div>

    </div>
  );
 };