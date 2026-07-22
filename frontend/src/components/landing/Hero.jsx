import { Link } from "react-router-dom";
import { FiArrowRight, FiGithub } from "react-icons/fi";

function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center justify-between gap-16 px-8">

        {/* LEFT */}

        <div className="max-w-xl">

          {/* Badge */}

          <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            🚀 Built with Spring Boot • React • PostgreSQL
          </div>

          {/* Heading */}

          <h1 className="mt-8 text-6xl font-black leading-tight text-white">

            LinkLens

            <span className="mt-3 block text-3xl font-semibold text-violet-300">

              See Beyond the Click

            </span>

          </h1>

          {/* Description */}

          <p className="mt-8 text-lg leading-8 text-slate-400">

            Shorten URLs, generate QR codes and unlock powerful
            analytics from one modern dashboard.

            Built for speed, scalability and simplicity.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex gap-4">

            <Link
              to="/register"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-violet-600
                px-6
                py-4
                font-semibold
                text-white
                transition
                hover:bg-violet-500
              "
            >
              Get Started

              <FiArrowRight />
            </Link>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-700
                px-6
                py-4
                text-slate-300
                transition
                hover:bg-slate-900
                hover:text-white
              "
            >
              <FiGithub />

              GitHub

            </a>

          </div>

          {/* Stats */}

          <div className="mt-14 flex gap-12">

            <div>

              <h2 className="text-3xl font-bold text-white">
                99.9%
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Availability
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">
                &lt;100ms
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Redirect Time
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">
                Real-Time
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Analytics
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex-1">

          {/* Dashboard Placeholder */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/70
              shadow-[0_25px_80px_rgba(0,0,0,.45)]
            "
          >

            <div className="border-b border-slate-800 px-6 py-5">

              <h2 className="font-semibold text-white">

                Dashboard Preview

              </h2>

            </div>

            <div className="space-y-6 p-6">

              {/* Stats */}

              <div className="grid grid-cols-3 gap-4">

                {[
                  ["1.2K", "Clicks"],
                  ["85", "Links"],
                  ["24", "Countries"],
                ].map(([value, label]) => (

                  <div
                    key={label}
                    className="rounded-2xl bg-slate-950 p-5"
                  >

                    <h3 className="text-3xl font-bold text-white">
                      {value}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {label}
                    </p>

                  </div>

                ))}

              </div>

              {/* Fake Chart */}

              <div className="rounded-2xl bg-slate-950 p-6">

                <div className="mb-5 text-white">
                  Traffic Overview
                </div>

                <div className="flex h-48 items-end gap-3">

                  {[45, 70, 52, 85, 65, 90, 60].map((h, i) => (

                    <div
                      key={i}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-violet-600 to-indigo-500"
                      style={{ height: `${h}%` }}
                    />

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;