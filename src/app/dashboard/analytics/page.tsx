"use client";

import axios from "axios"
import { useEffect, useState } from "react";
import CPUChart from "../../components/cpucomponents"


interface MetricData {
  Timestamp: string
  Average: number
}

export default function AnalyticsPage() {

  const [aws,setaws] = useState(false)
  const [accesskey,setaccesskey] = useState("")
  const [secretkey,setsecretkey] = useState("")
  const [region,setregion] = useState("")
  const [accesskey1,setaccesskey1] = useState("")
  const [secretkey1,setsecretkey1] = useState("")
  const [region1,setregion1] = useState("")
  const [metrics,setmetrics]=useState<MetricData[]>([])
  const [networkin,setnetworkin]=useState<MetricData[]>([])
  const [networkout,setnetworkout]=useState<MetricData[]>([])
  const [totalrequests,settotalrequests]=useState(0)
  const [showform,setshowform]=useState(false)
  const [balance,setbalance]=useState()   
  const [showsecret,setshowsecret]=useState(false)
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/services");
        console.log("Data from API:", response.data);
      }
        catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(()=>{
    const fetchdata=async()=>{
      try {
        const response=await axios.get("/api/totalrequests")
        settotalrequests(response.data.totalRequests)
        console.log("Total Requests:", response.data);
      } 
      catch(error){
        console.error("Error fetching total requests:", error);
      }
    }
    fetchdata();
  },[])
  async function connectAWS(e:any) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/connectaws", {
        accessKey: accesskey,
        secretKey: secretkey,
        region: region,
      });

      if(response.data.success==true){
        setaws(true)
        setshowform(false)
        alert("AWS connected successfully")
      }
    } catch (error) {
      console.error("Error connecting to AWS:", error);
    }
  } 
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/checkaws");
        if(response.data.success==true){
        setaws(false)
         } 
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getcpuinfo");
         setmetrics(response.data.metrics.cpu)
        setnetworkin(response.data.metrics.networkIn)
        setnetworkout(response.data.metrics.networkOut)
        setbalance(response.data.metrics.awscost.ResultsByTime[0].groups[5].Metrics.UnblendedCost.Amount)
       }
        catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getinfo");
        console.log("Data from the get info api is",response)
        if(!response.data.data.length){
          setaws(false)
        }
        setaccesskey1(response.data.data[0].access_key);
        setsecretkey1(response.data.data[0].secret_key);
        setregion1(response.data.data[0].region);
      }
        catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
 metrics.sort((a:any,b:any)=>{
    return new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
  }) 
  networkin.sort((a:any,b:any)=>{
    return new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
  })
    networkout.sort((a:any,b:any)=>{
    return new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
  })
 const cpudata = metrics.map(
  (item:any) => ({
    time: new Date(
      item.Timestamp
    ).toLocaleTimeString(),

    cpu: Number(
      item.Average.toFixed(2)
    ),
  })
);
  const networkData =
  networkin.map(
  (item:any,index:number)=>({

    fullTime:item.Timestamp,

    time:new Date(
      item.Timestamp
    ).toLocaleTimeString(),

    incoming:Number(
      item.Average.toFixed(2)
    ),

    outgoing:Number(
      networkout[index]
        ?.Average?.toFixed(2) || 0
    ),
 }));

  return (
    <div className="space-y-10">

      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Analytics Overview
        </h2>

        <p className="text-zinc-400 mt-2">
          Track API performance, usage growth and system activity.
        </p>
      </div>

      {!aws ? (
        /* Not connected: show ONLY the AWS button, nothing else */
        <div className="flex justify-center py-24">
          <button
          onClick={()=>setshowform(true)}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
          >
            Connect AWS
          </button>
        </div>
      ) : (
        /* Connected: show everything */
        <>
          <div className="flex items-center gap-2 text-green-400 font-medium">
            <span>AWS Connected</span>
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              { title: "Total Requests", value: `${totalrequests}` },
              { title: "Active Users", value: "1" },
              { title: "Error Rate", value: "0.8%" },
              { title: "Avg Response Time", value: "240ms" },
              {
                title: "Remaining Balance",
                value: `$${balance || "0.9"}`,
                highlight: true,
              },
            ].map((metric) => (
              <div
                key={metric.title}
                className={`group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1
                ${
                  metric.highlight
                    ? "bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-900 border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]"
                    : "bg-zinc-900 border-zinc-800 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                {metric.highlight && (
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-400/20">
                      <svg
                        className="w-5 h-5 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-3.866 0-7 1.79-7 4s3.134 4 7 4 7-1.79 7-4-3.134-4-7-4zm0 0V5m0 11v3"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                <p
                  className={`text-sm ${
                    metric.highlight ? "text-emerald-300" : "text-zinc-400"
                  }`}
                >
                  {metric.title}
                </p>

                <h3
                  className={`text-3xl font-bold mt-3 tracking-tight ${
                    metric.highlight
                      ? "text-emerald-400"
                      : "group-hover:text-blue-400"
                  }`}
                >
                  {metric.value}
                </h3>

                {metric.highlight && (
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-zinc-400 mb-2">
                      <span>Budget Usage</span>
                      <span>12%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full w-[12%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Main Chart Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Cpu utilization</h3>
              <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-blue-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <CPUChart data={cpudata} />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <h4 className="font-semibold mb-4">Request Distribution</h4>
              <CPUChart data={networkData} />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <h4 className="font-semibold mb-4">Storage Growth</h4>
              <CPUChart data={cpudata} />
            </div>
          </div>
        </>
      )}
      
      {showform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl overflow-hidden border border-zinc-700 shadow-2xl shadow-black/50">

            {/* AWS-style header bar */}
            <div className="bg-[#232F3E] px-6 py-5 flex items-center gap-3 border-b-2 border-orange-500">
              <div className="w-9 h-9 rounded-md bg-orange-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#232F3E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3l7.5 3.75L12 11.8 4.5 8.05 12 4.3zM4 9.6l7 3.5v7.2l-7-3.5V9.6zm9 10.7v-7.2l7-3.5v7.2l-7 3.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg leading-tight">
                  Connect AWS Account
                </h3>
                <p className="text-zinc-400 text-xs mt-0.5">
                  Credentials are encrypted at rest
                </p>
              </div>
            </div>

            {/* Form body */}
            <div className="bg-[#1B2532] px-6 py-6 space-y-5">

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wide uppercase">
                  Access Key ID
                </label>
                <input
                  type="text"
                  value={accesskey}
                  onChange={(e) => setaccesskey(e.target.value)}
                  placeholder="AKIAIOSFODNN7EXAMPLE"
                  className="w-full bg-[#0F1722] border border-zinc-700 rounded-md px-3 py-2.5 text-sm text-zinc-100 font-mono placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wide uppercase">
                  Secret Access Key
                </label>
                <div className="relative">
                  <input
                    type={showsecret ? "text" : "password"}
                    value={secretkey}
                    onChange={(e) => setsecretkey(e.target.value)}
                    placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                    className="w-full bg-[#0F1722] border border-zinc-700 rounded-md px-3 py-2.5 pr-10 text-sm text-zinc-100 font-mono placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setshowsecret(!showsecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-orange-400 transition"
                  >
                    {showsecret ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wide uppercase">
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setregion(e.target.value)}
                  className="w-full bg-[#0F1722] border border-zinc-700 rounded-md px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 transition appearance-none"
                >
                  <option value="us-east-1">US East (N. Virginia) — us-east-1</option>
                  <option value="us-west-2">US West (Oregon) — us-west-2</option>
                  <option value="eu-west-1">Europe (Ireland) — eu-west-1</option>
                  <option value="ap-south-1">Asia Pacific (Mumbai) — ap-south-1</option>
                  <option value="ap-southeast-1">Asia Pacific (Singapore) — ap-southeast-1</option>
                </select>
              </div>

              {/* Footer actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setshowform(false)}
                  className="flex-1 px-4 py-2.5 rounded-md text-sm font-medium text-zinc-300 border border-zinc-700 hover:bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={connectAWS}
                  className="flex-1 px-4 py-2.5 rounded-md text-sm font-semibold text-[#232F3E] bg-orange-500 hover:bg-orange-400 transition shadow-md shadow-orange-500/20"
                >
                  Connect
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center pt-1">
                Use an IAM user with read-only billing and CloudWatch access
              </p>
            </div>
          </div>
        </div>
        
      )}
        
 
    </div>
  );
}
