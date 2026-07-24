import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



function ChartCard({ data, totalClicks }) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-[#111827]
        p-7
        shadow-lg
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
            ANALYTICS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Click Activity
          </h2>

          <p className="mt-2 text-slate-400">
            Last 7 days
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-slate-400">
            Total Clicks
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {totalClicks.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* Chart */}

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">

                <stop
                  offset="5%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="#8b5cf6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })
              }
            />

            <Tooltip
              contentStyle={{
                background: "#1e293b",
                border: "none",
                borderRadius: "14px",
                color: "white",
              }}
            />

            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#8b5cf6"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorClicks)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}



export default ChartCard;