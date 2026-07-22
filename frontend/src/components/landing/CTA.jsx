import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function CTA() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-8">

        <div
          className="
            rounded-[32px]
            border
            border-violet-500/20
            bg-gradient-to-r
            from-violet-600/10
            to-indigo-600/10
            p-16
            text-center
          "
        >

          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Get Started
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Ready to shorten smarter?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Create secure short links, generate QR codes,
            and analyze every click from one modern dashboard.
          </p>

          <Link
            to="/register"
            className="
              mt-10
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-violet-600
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-violet-500
            "
          >
            Create Free Account

            <FiArrowRight />

          </Link>

        </div>

      </div>
    </section>
  );
}

export default CTA;