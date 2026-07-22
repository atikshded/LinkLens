import {
  FiMousePointer,
  FiGlobe,
  FiLink2,
  FiBarChart2,
} from "react-icons/fi";

function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="py-28"
    >
      <div className="mx-auto max-w-7xl px-8">

        {/* Heading */}

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Dashboard
          </span>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Built for insights.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Monitor every click, track performance, and manage all your
            shortened links from one clean dashboard.
          </p>

        </div>

        {/* Dashboard */}

        <div className="mt-16 overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900/60 shadow-[0_25px_80px_rgba(0,0,0,.45)]">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

            <div>

              <h3 className="text-xl font-semibold text-white">
                Dashboard Overview
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Last updated a few seconds ago
              </p>

            </div>

            <button className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">
              Create Link
            </button>

          </div>

          <div className="p-8">

            {/* Stats */}

            <div className="grid gap-6 md:grid-cols-4">

              <StatCard
                icon={<FiMousePointer />}
                title="Total Clicks"
                value="12,486"
              />

              <StatCard
                icon={<FiLink2 />}
                title="Active Links"
                value="184"
              />

              <StatCard
                icon={<FiGlobe />}
                title="Countries"
                value="37"
              />

              <StatCard
                icon={<FiBarChart2 />}
                title="CTR"
                value="82%"
              />

            </div>

            {/* Main Grid */}

            <div className="mt-8 grid gap-6 lg:grid-cols-3">

              {/* Chart */}

              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 lg:col-span-2">

                <h4 className="text-lg font-semibold text-white">
                  Traffic Overview
                </h4>

                <div className="mt-8 flex h-60 items-end gap-3">

                  {[30,45,38,60,55,70,82,65,74,68,85,78].map((h, i) => (

                    <div
                      key={i}
                      className="flex-1 rounded-t-xl bg-gradient-to-t from-violet-600 to-indigo-500"
                      style={{ height: `${h}%` }}
                    />

                  ))}

                </div>

              </div>

              {/* Countries */}

              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">

                <h4 className="text-lg font-semibold text-white">
                  Top Countries
                </h4>

                <div className="mt-6 space-y-5">

                  {[
                    ["🇮🇳 India","45%"],
                    ["🇺🇸 United States","22%"],
                    ["🇬🇧 United Kingdom","14%"],
                    ["🇩🇪 Germany","8%"],
                    ["🌎 Others","11%"],
                  ].map(([country,value])=>(

                    <div
                      key={country}
                      className="flex items-center justify-between"
                    >

                      <span className="text-slate-300">
                        {country}
                      </span>

                      <span className="font-semibold text-white">
                        {value}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* Recent Links */}

            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950 p-6">

              <h4 className="text-lg font-semibold text-white">
                Recent Links
              </h4>

              <div className="mt-6 space-y-4">

                {[
                  ["lnklens.dev/ab91Kd","2,481"],
                  ["lnklens.dev/xA72Pk","1,856"],
                  ["lnklens.dev/qP83Lm","1,223"],
                ].map(([url,clicks])=>(

                  <div
                    key={url}
                    className="flex items-center justify-between rounded-2xl bg-slate-900 px-5 py-4"
                  >

                    <span className="font-medium text-violet-300">
                      {url}
                    </span>

                    <span className="text-slate-300">
                      {clicks} clicks
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">

      <div className="text-violet-400 text-2xl">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}

export default DashboardPreview;