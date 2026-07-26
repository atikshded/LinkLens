function VariantPerformanceTable({ variants }) {
  if (!variants || variants.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-white">
          🎯 Variant Performance
        </h2>

        <div className="flex h-32 items-center justify-center text-slate-400">
          No traffic variants configured for this link yet.
        </div>
      </div>
    );
  }

  const totalClicks = variants.reduce(
    (sum, variant) => sum + variant.clickCount,
    0
  );

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">
        🎯 Variant Performance
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left text-sm uppercase tracking-wide text-slate-400">
              <th className="pb-3">Variant</th>
              <th className="pb-3 text-center">Weight</th>
              <th className="pb-3 text-center">Clicks</th>
              <th className="pb-3 text-center">Traffic Share</th>
            </tr>
          </thead>

          <tbody>
            {variants.map((variant) => {
              const trafficShare =
                totalClicks === 0
                  ? 0
                  : ((variant.clickCount / totalClicks) * 100).toFixed(1);

              let hostname = variant.destinationUrl;

try {
  hostname = new URL(variant.destinationUrl)
    .hostname
    .replace("www.", "");
} catch {
  // Fallback to the original string
}

              return (
                <tr
                  key={variant.id}
                  className="border-b border-slate-800 last:border-none"
                >
                  <td className="py-4 font-medium text-white">
                    {hostname}
                  </td>

                  <td className="py-4 text-center text-slate-300">
                    {variant.weight}%
                  </td>

                  <td className="py-4 text-center text-slate-300">
                    {variant.clickCount}
                  </td>

                  <td className="py-4 text-center font-semibold text-violet-400">
                    {trafficShare}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VariantPerformanceTable;