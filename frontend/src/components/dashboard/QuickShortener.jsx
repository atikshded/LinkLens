import { FiLink2 } from "react-icons/fi";

function QuickShortener() {
  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-800
      bg-[#111827]
      p-6
      shadow-lg
    "
    >
      <p className="mb-4 text-lg font-semibold text-white">
        Shorten a new link
      </p>

      <div className="flex gap-4">

        <div className="relative flex-1">

          <FiLink2
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Paste your long URL here..."
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              pl-12
              pr-4
              text-white
              outline-none
              focus:border-violet-500
            "
          />

        </div>

        <button
          className="
            rounded-2xl
            bg-violet-600
            px-8
            font-semibold
            text-white
            transition
            hover:bg-violet-700
          "
        >
          Shorten
        </button>

      </div>

    </div>
  );
}

export default QuickShortener;