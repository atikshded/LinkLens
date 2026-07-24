
function BrowserCard({ browsers }) {
  const browserData = Object.entries(browsers || {}).map(
  ([name, count]) => ({
    name,
    count,
  })
);

const total = browserData.reduce(
  (sum, browser) => sum + browser.count,
  0
);

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">

      <div className="mb-6">

        <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
          Browsers
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Browser Distribution
        </h2>

      </div>

      <div className="space-y-6">

      {browserData.map((browser) => {
  const percentage =
    total === 0
      ? 0
      : Math.round((browser.count / total) * 100);

  return (
    <div
      key={browser.name}
      className="
        group
        rounded-xl
        p-3
        transition-all
        duration-300
        cursor-pointer
        hover:bg-slate-800/40
      "
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌐</span>

          <span className="font-medium text-white">
            {browser.name}
          </span>
        </div>

        <span className="font-semibold text-violet-400">
          {percentage}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-800">
        <div
          className="
            h-full
            rounded-full
            bg-violet-500
            transition-all
            duration-300
            group-hover:bg-violet-400
            group-hover:shadow-lg
            group-hover:shadow-violet-500/30
          "
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
})}
         



  
         

      </div>

    </div>
  );
}

export default BrowserCard;