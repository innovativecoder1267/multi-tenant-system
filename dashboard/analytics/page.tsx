export default function AnalyticsPage() {
  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Analytics Overview
        </h2>
        <p className="text-zinc-400 mt-2">
          Track API performance, usage growth and system activity.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-6">

        {[
          { title: "Total Requests", value: "12,430" },
          { title: "Active Users", value: "86" },
          { title: "Error Rate", value: "0.8%" },
          { title: "Avg Response Time", value: "240ms" },
        ].map((metric) => (
          <div
            key={metric.title}
            className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
          >
            <p className="text-zinc-400 text-sm">{metric.title}</p>
            <h3 className="text-2xl font-semibold mt-2 group-hover:text-blue-400">
              {metric.value}
            </h3>
          </div>
        ))}

      </div>

      {/* Main Chart Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            API Requests Trend
          </h3>

          <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-blue-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        {/* Chart Placeholder */}
        <div className="h-64 rounded-2xl bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-6">

        {/* API Distribution */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <h4 className="font-semibold mb-4">Request Distribution</h4>
          <div className="h-40 rounded-xl bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>

        {/* Storage Growth */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <h4 className="font-semibold mb-4">Storage Growth</h4>
          <div className="h-40 rounded-xl bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>

      </div>

    </div>
  );
}