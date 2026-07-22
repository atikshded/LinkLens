import {
  FiBarChart2,
  FiGlobe,
  FiShield,
  FiClock,
  FiLink2,
  FiSmartphone,
} from "react-icons/fi";

const features = [
  {
    icon: <FiLink2 size={28} />,
    title: "Smart URL Shortening",
    description:
      "Generate clean, memorable short links with a single click.",
  },
  {
    icon: <FiBarChart2 size={28} />,
    title: "Real-Time Analytics",
    description:
      "Track clicks, browsers, devices and traffic instantly.",
  },
  {
    icon: <FiGlobe size={28} />,
    title: "Geo Insights",
    description:
      "Understand where your visitors are coming from worldwide.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Secure Authentication",
    description:
      "JWT authentication with Google OAuth support.",
  },
  {
    icon: <FiClock size={28} />,
    title: "Link Expiry",
    description:
      "Automatically expire links whenever you need.",
  },
  {
    icon: <FiSmartphone size={28} />,
    title: "QR Code Generation",
    description:
      "Share links instantly using downloadable QR codes.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-28"
    >
      <div className="mx-auto max-w-7xl px-8">

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Features
          </span>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Everything you need.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            LinkLens provides all the tools required to shorten,
            manage and analyze links from one modern dashboard.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="
                group
                rounded-3xl
                border
                border-slate-800
                bg-slate-900/50
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-violet-500/40
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-violet-500/10
                  text-violet-400
                  transition
                  group-hover:bg-violet-500
                  group-hover:text-white
                "
              >
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;