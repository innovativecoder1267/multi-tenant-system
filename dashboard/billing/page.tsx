"use client"
import axios from "axios";
import { useState } from "react";

export default function BillingPage() {
  const [currentplan, setcurrentplan] = useState()
  async function handleplan(name: any) {
    if (!name) return
    console.log("name is", name);
    const res = await axios.post("/api/change-plan", { name })
    if (res.status === 200) {
      alert("Plan changed success")
      setcurrentplan(name)
    }
    if (res.status === 401 || res.status === 403 || res.status === 404) {
      alert("Something went wrong")
    }
  }
  return (
    <div className="space-y-10">


      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Billing & Subscription
        </h2>
        <p className="text-zinc-400 mt-2">
          Manage your plan, payment methods and invoices.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-zinc-400 text-sm">Current Plan</p>
            <h3 className="text-2xl font-semibold mt-2 text-blue-400">
              Pro Plan
            </h3>
            <p className="text-zinc-500 text-sm mt-1">
              ₹999 / month
            </p>
          </div>

          <button className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl text-sm">
            Cancel Plan
          </button>
        </div>
      </div>

      {/* Upgrade Plans */}
      <div className="grid grid-cols-3 gap-6">

        {[
          { name: "Free", price: "₹0 / month" },
          { name: "Pro", price: "₹999 / month" },
          { name: "Business", price: "₹2499 / month" },
        ].map((plan) => (
          <div
            key={plan.name}
            className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <h4 className="text-lg font-semibold">
              {plan.name}
            </h4>

            <p className="text-zinc-400 text-sm mt-2">
              {plan.price}
            </p>

            <ul className="text-zinc-500 text-sm mt-4 space-y-2">
              <li>✔ Unlimited API Requests</li>
              <li>✔ Team Members Access</li>
              <li>✔ Priority Support</li>
            </ul>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-xl text-sm shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40">

              {plan.name == currentplan || plan.name === "Free" ? (
                <p>Current plan</p>
              ) : (
                <p onClick={() => handleplan(plan.name)}>Choose plan</p>
              )}
            </button>
          </div>
        ))}

      </div>

      {/* Billing History */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-6">
          Billing History
        </h3>

        <div className="space-y-4">
          {[
            { date: "01 Mar 2026", amount: "₹999", status: "Paid" },
            { date: "01 Feb 2026", amount: "₹999", status: "Paid" },
          ].map((invoice, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-zinc-950 border border-zinc-800 rounded-xl p-4 hover:border-blue-500 transition"
            >
              <div>
                <p className="text-sm text-zinc-300">
                  {invoice.date}
                </p>
                <p className="text-xs text-zinc-500">
                  {invoice.amount}
                </p>
              </div>

              <span className="text-green-400 text-sm">
                {invoice.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}