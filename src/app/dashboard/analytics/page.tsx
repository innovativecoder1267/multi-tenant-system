"use client";

import axios from "axios"
import { useEffect, useState } from "react";
import CPUChart from "../../components/cpucomponents"
export default function AnalyticsPage() {

  const [aws,setaws] = useState(false)
  const [accesskey,setaccesskey] = useState("")
  const [secretkey,setsecretkey] = useState("")
  const [region,setregion] = useState("")
  const [accesskey1,setaccesskey1] = useState("")
  const [secretkey1,setsecretkey1] = useState("")
  const [region1,setregion1] = useState("")
  const [metrics,setmetrics]=useState([])
  const [networkin,setnetworkin]=useState([])
  const [networkout,setnetworkout]=useState([])
  const [totalrequests,settotalrequests]=useState(0)
  const [checkaws,setcheckaws]=useState(false)
  const [balance,setbalance]=useState()   
   // we will create a api which hits the services route and gets the data from aws and then we will display it in the charts and metrics
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
  })
  async function connectAWS(e:any) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/connectaws", {
        accessKey: accesskey,
        secretKey: secretkey,
        region: region,
      });
      if(response.data.success==true){
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

{aws ? (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
    {/* your modal code */}
                <button
            onClick={()=>setaws(true)}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700">
  <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.071-.208.071-.08 0-.16-.04-.239-.112-.12-.127-.216-.263-.296-.408-.08-.144-.16-.304-.256-.488-.655.775-1.479 1.167-2.463 1.167-.703 0-1.264-.2-1.695-.599-.43-.4-.646-.936-.646-1.591 0-.704.248-1.272.75-1.695.502-.424 1.167-.632 2.015-.632.279 0 .567.024.87.064.303.04.615.104.95.168v-.576c0-.598-.127-1.016-.375-1.263-.255-.248-.686-.368-1.295-.368-.279 0-.567.031-.863.103-.295.072-.583.16-.862.272-.128.055-.224.088-.271.104-.048.016-.08.024-.104.024-.096 0-.144-.072-.144-.208v-.328c0-.104.016-.184.056-.24.04-.055.12-.104.239-.16.28-.144.615-.264 1.007-.36C2.84 4.04 3.263 4 3.71 4c1.295 0 2.239.296 2.831.888.584.592.88 1.487.88 2.687v3.461zm-3.415 1.279c.271 0 .551-.048.846-.144.295-.096.56-.272.774-.51.128-.16.224-.336.271-.536.048-.2.08-.424.08-.671V9.02c-.224-.047-.463-.08-.71-.104-.248-.023-.487-.031-.727-.031-.518 0-.903.104-1.159.319-.255.216-.375.52-.375.918 0 .375.095.655.295.846.191.2.479.295.87.295zm6.238.823c-.128 0-.215-.024-.279-.08-.064-.048-.12-.16-.168-.311L7.306 4.362c-.047-.16-.072-.263-.072-.32 0-.128.064-.2.191-.2h.783c.136 0 .224.024.279.08.064.048.113.16.161.311l1.511 5.951 1.407-5.951c.032-.16.08-.263.143-.311.064-.048.16-.08.279-.08h.639c.136 0 .224.024.279.08.064.048.12.16.144.311l1.423 6.022 1.543-6.022c.048-.16.104-.263.168-.311.063-.048.151-.08.279-.08h.742c.128 0 .2.064.2.2 0 .04-.009.08-.017.128-.008.048-.024.112-.056.192l-2.15 7.381c-.048.16-.104.263-.168.311-.064.048-.16.08-.279.08h-.688c-.136 0-.224-.024-.279-.08-.064-.056-.12-.16-.144-.319L12.535 6.2l-1.383 5.702c-.032.16-.08.263-.143.319-.064.056-.16.08-.279.08h-.688zm9.582.32c-.367 0-.735-.04-1.095-.12-.359-.08-.64-.16-.838-.256-.128-.063-.215-.136-.247-.2-.032-.063-.048-.16-.048-.279v-.336c0-.136.048-.2.144-.2.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.56.215.862.272.303.056.607.088.918.088.518 0 .918-.088 1.191-.264.279-.176.415-.432.415-.774 0-.224-.072-.416-.215-.567-.144-.152-.463-.296-.95-.432l-1.367-.431c-.695-.216-1.207-.535-1.535-.95-.328-.416-.487-.878-.487-1.383 0-.4.087-.75.263-1.055.176-.304.415-.567.71-.782.296-.216.64-.375 1.048-.495.407-.12.838-.176 1.295-.176.16 0 .328.008.488.032.167.024.32.048.479.08.151.04.295.08.431.127.136.048.247.096.336.144.127.064.215.128.263.2.048.071.072.168.072.295v.312c0 .136-.048.2-.144.2-.056 0-.151-.024-.271-.08-.527-.24-1.119-.36-1.781-.36-.471 0-.846.072-1.103.232-.263.16-.391.392-.391.71 0 .224.08.416.239.576.16.16.5.32 1.015.472l1.335.415c.687.216 1.191.52 1.511.91.32.392.472.863.472 1.407 0 .416-.088.782-.256 1.103-.176.32-.415.591-.735.814-.312.224-.695.391-1.143.503-.448.128-.942.184-1.463.184z"/>
  </svg>
  
 
  
</button>
  </div>
) : (
<div className="flex items-center gap-3 mt-4">
 

  {/* Connected Status */}
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
</div>
)}
      {/* Top Metrics */}
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
    {/* Glow Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

    {/* Top Right Icon */}
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

    {/* Bottom Progress */}
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
          <h3 className="text-xl font-semibold">
        Cpu utilization  
          </h3>
                <CPUChart data={cpudata} />

          <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-blue-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-6">

        {/* API Distribution */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <h4 className="font-semibold mb-4">Request Distribution</h4>
                    <CPUChart data={networkData} />

        </div>
        {/* Storage Growth */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <h4 className="font-semibold mb-4">Storage Growth</h4>
          <CPUChart data={cpudata}/>
        </div>
      </div>
    </div>
  );
}
