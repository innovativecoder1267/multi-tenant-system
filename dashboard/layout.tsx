"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Members", href: "/dashboard/member" },
  { name: "Billing", href: "/dashboard/billing" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "API Keys", href: "/dashboard/api-key" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex relative">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

      {/* Sidebar */}

      <aside className="w-64 bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-800 p-6 flex flex-col justify-between">

        <div>
         <img src="/saas.png" className="w-5 h-5" alt="SaaS Starter logo" />

          <h1 className="text-xl font-semibold mb-10 tracking-tight">

            SaaS Starter
          </h1>

          <nav className="space-y-3 text-sm">
            {links.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-zinc-800 border-l-2 border-blue-500 text-blue-400"
                      : "hover:bg-zinc-800 hover:text-blue-400 hover:translate-x-1"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="text-xs text-zinc-500">
          © 2026 SaaS Starter
        </div>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-10 space-y-10">
        {children}
      </main>
    </div>
  );
}