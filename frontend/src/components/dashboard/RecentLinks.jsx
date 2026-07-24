import { FiExternalLink, FiCopy } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RecentLinks({ links }) {
  const navigate = useNavigate();

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch (err) {
      toast.error("Failed to copy link.");
      console.error(err);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Recent Links
        </h2>

        <button
          onClick={() => navigate("/links")}
          className="
            text-sm
            font-medium
            text-violet-400
            transition-colors
            hover:text-violet-300
          "
        >
          View All →
        </button>
      </div>

      <div className="mt-6 space-y-4">
  {!links || links.length === 0 ? (
    <div className="py-10 text-center text-slate-400">
      No links created yet.
    </div>
  ) : (
    links.slice(0, 3).map((link) => (
          <div
            key={link.id}
            className="
              group
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-transparent
              bg-[#090D1A]
              p-5
              transition-all
              duration-500
              ease-out
              hover:bg-slate-800/40
              hover:border-slate-700
              hover:shadow-lg
              hover:shadow-violet-950/20
            "
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-violet-400 truncate">
                {"/r/" + link.shortUrl.split("/").pop()}
              </h3>

              <p className="mt-1 truncate text-sm text-slate-400">
                {link.originalUrl}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Created{" "}
                {new Date(link.createdAt).toLocaleDateString()} •{" "}
                {link.clickCount.toLocaleString()} Clicks
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => copyToClipboard(link.shortUrl)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-800
                  text-slate-400
                  transition-all
                  duration-300
                  hover:bg-violet-600
                  hover:text-white
                "
              >
                <FiCopy />
              </button>

              <button
                onClick={() => navigate(`/analytics/${link.id}`)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-800
                  text-slate-400
                  transition-all
                  duration-300
                  hover:bg-violet-600
                  hover:text-white
                "
              >
                <FiExternalLink />
              </button>
            </div>
          </div>
                ))
      )}
    </div>
    </div>
  );
}

export default RecentLinks;