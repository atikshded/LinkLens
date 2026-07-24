import { useState } from "react";
import {
  FiX,
  FiLink,
  FiTag,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { createLink } from "../../services/linkService";

function CreateLinkModal({ open, onClose, onSuccess }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCreateLink = async () => {
  if (!originalUrl.trim()) {
    toast.error("Please enter a URL.");
    return;
  }
  let url = originalUrl.trim();

if (
  !url.startsWith("http://") &&
  !url.startsWith("https://")
) {
  url = "https://" + url;
}

  try {
    setLoading(true);
console.log("Token:", localStorage.getItem("token"));
    const newLink = await createLink({
      originalUrl: url,
      customAlias: customAlias.trim() || null,
      expiresAt: null,
    });
      console.log(newLink);

    toast.success("Link created successfully!");

setOriginalUrl("");
setCustomAlias("");

// Notify parent to refresh data
if (onSuccess) {
  onSuccess(newLink);
}

onClose();
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to create link."
    );
  } finally {
    setLoading(false);
  }
};

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        overflow-y-auto
        bg-black/60
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          min-h-full
          items-center
          justify-center
          p-6
        "
      >
        <div
          className="
            relative
            w-full
            max-w-[640px]
            rounded-3xl
            border
            border-slate-700
            bg-[#111827]
            p-10
            shadow-2xl
          "
        >
          {/* Close */}

          <button
            onClick={onClose}
            className="
              absolute
              right-6
              top-6
              rounded-xl
              p-2
              text-slate-400
              transition-all
              duration-300
              hover:bg-slate-800
              hover:text-white
            "
          >
            <FiX size={22} />
          </button>

          {/* Header */}

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-500/20
                to-purple-500/20
                text-violet-400
              "
            >
              <FiLink size={26} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                Create New Link
              </h2>

              <p className="mt-1 text-slate-400">
                Shorten your URL and start tracking clicks instantly.
              </p>
            </div>
          </div>

          {/* Form */}

          <div className="mt-10 space-y-6">

            {/* Original URL */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Original URL
                <span className="text-red-400"> *</span>
              </label>

              <div className="relative">

                <FiLink
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                  size={18}
                />

                <input
                  type="url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com"
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
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-violet-500
                  "
                />

              </div>
            </div>

            {/* Alias */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Custom Alias
              </label>

              <div className="relative">

                <FiTag
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                  size={18}
                />

                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-custom-link"
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
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-violet-500
                  "
                />

              </div>
            </div>

          
      
             

            {/* Footer */}

            <div className="flex justify-end gap-4 pt-4">

              <button
                onClick={onClose}
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-6
                  py-3
                  text-slate-300
                  transition-all
                  duration-300
                  hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
  onClick={handleCreateLink}
  disabled={loading}
  className="
    rounded-xl
    bg-violet-600
    px-6
    py-3
    font-medium
    text-white
    transition-all
    duration-300
    hover:bg-violet-700
    hover:scale-[1.02]
    active:scale-95
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {loading ? "Creating..." : "Create Link"}
</button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLinkModal;