const countries = [
  {
    flag: "🇮🇳",
    name: "India",
    percent: 62,
    clicks: 7654,
  },
  {
    flag: "🇺🇸",
    name: "United States",
    percent: 20,
    clicks: 2458,
  },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    percent: 10,
    clicks: 1243,
  },
  {
    flag: "🇨🇦",
    name: "Canada",
    percent: 8,
    clicks: 986,
  },
];

function CountryCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">

      <div className="mb-6">

        <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
          Geography
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Top Countries
        </h2>

      </div>

      <div className="space-y-6">

        {countries.map((country) => (

          <div
    key={country.name}
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

                <span className="text-2xl">
                  {country.flag}
                </span>

                <div>

                  <p className="font-medium text-white">
                    {country.name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {country.clicks.toLocaleString()} clicks
                  </p>

                </div>

              </div>

              <span className="font-semibold text-violet-400">
                {country.percent}%
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
                  width: `${country.percent}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CountryCard;