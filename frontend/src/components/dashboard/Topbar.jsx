import { FiBell, FiPlus, FiSearch } from "react-icons/fi";

function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-[#060816] px-8">

      {/* Search */}

      <div className="relative w-96">

        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

        <input
          type="text"
          placeholder="Search links..."
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            py-3
            pl-12
            pr-4
            text-white
            outline-none
            focus:border-violet-500
          "
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-3
            font-medium
            text-white
            hover:bg-violet-500
          "
        >
          <FiPlus />

          New Link
        </button>

        <button className="rounded-xl bg-slate-900 p-3 text-slate-300 hover:text-white">
          <FiBell size={20} />
        </button>

        <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
            K
          </div>

          <div>

            <p className="text-sm font-semibold text-white">
              Khushi
            </p>

            <p className="text-xs text-slate-400">
              Developer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;