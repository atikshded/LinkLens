const countries = [
  { name: "India", percent: 45 },
  { name: "United States", percent: 22 },
  { name: "Germany", percent: 15 },
  { name: "United Kingdom", percent: 10 },
  { name: "Others", percent: 8 },
];

function CountryCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold text-white">
        Top Countries
      </h2>

      <div className="mt-6 space-y-5">

        {countries.map((country) => (

          <div key={country.name}>

            <div className="mb-2 flex justify-between">

              <span className="text-slate-300">
                {country.name}
              </span>

              <span className="text-white">
                {country.percent}%
              </span>

            </div>

            <div className="h-2 rounded-full bg-slate-800">

              <div
                className="h-2 rounded-full bg-violet-600"
                style={{ width: `${country.percent}%` }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CountryCard;