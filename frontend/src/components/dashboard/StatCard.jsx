function StatCard({
  title,
  value,
  icon,
  change = "Updated today",
  badge = "Live",
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-[#111827]
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-[1.03]
        hover:border-violet-500/50
        hover:shadow-2xl
        hover:shadow-violet-500/20
      "
    >
      {/* Accent Bar */}
      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          bg-gradient-to-r
          from-violet-500
          via-fuchsia-500
          to-indigo-500
        "
      />

      {/* Background Glow */}
      <div
        className="
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      <div className="relative flex items-start justify-between">
        {/* Left Side */}
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white">
            {value}
          </h2>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-sm text-slate-400">
              {change}
            </span>

            <span
              className="
                rounded-full
                bg-emerald-500/15
                px-3
                py-1
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-emerald-400
              "
            >
              {badge}
            </span>
          </div>
        </div>

        {/* Icon */}
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-violet-500/20
            bg-violet-500/10
            text-violet-400
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:border-violet-400
            group-hover:bg-violet-500/20
          "
        >
          <div className="text-2xl">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;