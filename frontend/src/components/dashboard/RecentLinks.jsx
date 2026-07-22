import { FiExternalLink, FiCopy } from "react-icons/fi";

const links = [
  {
    shortUrl: "linklens.dev/aB23xY",
    originalUrl: "https://github.com/khushi/linklens",
    clicks: 1248,
  },
  {
    shortUrl: "linklens.dev/rT81Lm",
    originalUrl: "https://leetcode.com/",
    clicks: 847,
  },
  {
    shortUrl: "linklens.dev/pQ19Ks",
    originalUrl: "https://spring.io/",
    clicks: 562,
  },
];

function RecentLinks() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">
        Recent Links
      </h2>

      <div className="mt-6 space-y-4">
        {links.map((link) => (
          <div
            key={link.shortUrl}
            className="flex items-center justify-between rounded-2xl bg-slate-950 p-4"
          >
            <div>
              <h3 className="font-medium text-violet-400">
                {link.shortUrl}
              </h3>

              <p className="mt-1 text-sm text-slate-400 truncate max-w-md">
                {link.originalUrl}
              </p>
            </div>

            <div className="flex items-center gap-6">

              <span className="text-sm text-slate-300">
                {link.clicks} clicks
              </span>

              <button className="text-slate-400 hover:text-white">
                <FiCopy />
              </button>

              <button className="text-slate-400 hover:text-white">
                <FiExternalLink />
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentLinks;