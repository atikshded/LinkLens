import { useState } from "react";
import {
  FiX,
  FiLink,
  FiTag,
  FiCalendar,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { createLink } from "../../services/linkService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";


function CreateLinkModal({ open, onClose, onSuccess }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [neverExpire, setNeverExpire] = useState(true);
  const [expiresAt, setExpiresAt] = useState(null);
  const [loading, setLoading] = useState(false);
  const resetForm = () => {
  setOriginalUrl("");
  setCustomAlias("");
  setNeverExpire(true);
  setExpiresAt(null);
};
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
if (!neverExpire && !expiresAt) {
  toast.error("Please select an expiry date and time.");
  return;
}

  try {
    setLoading(true);
console.log("Token:", localStorage.getItem("token"));
    const newLink = await createLink({
  originalUrl: url,
  customAlias: customAlias.trim() || null,
  expiresAt: neverExpire
  ? null
  : new Date(expiresAt.getTime() - expiresAt.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19),
});
      console.log(newLink);

    toast.success("Link created successfully!");


resetForm();

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
  onClick={() => {
    resetForm();
    onClose();
  }}
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
            <hr className="border-slate-700" />

          <div className="space-y-4">

<div>
  <h3 className="text-sm font-semibold text-white">
    Link Expiry
  </h3>

  <p className="mt-1 mb-3 text-xs text-slate-400">
    Automatically disable this short link after a specific date.
  </p>
</div>

  <div className="space-y-3">

    
<div className="flex items-start justify-between gap-4 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">

  <div>
    <p className="text-sm font-medium text-white">
      Never Expires
    </p>

    <p className="text-xs text-slate-400">
      Disable to set an expiry date.
    </p>
  </div>

  <button
    type="button"
    onClick={() => setNeverExpire(!neverExpire)}
    className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
      neverExpire
        ? "bg-violet-600"
        : "bg-slate-600"
    }`}
  >
    <span
      className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
        neverExpire
          ? "left-6"
          : "left-1"
      }`}
    />
  </button>

</div>

  </div>

 <div className="pt-2">

  {!neverExpire && (

    <div className="relative">

      <FiCalendar
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-500
          z-10
        "
      />

      <DatePicker
  selected={expiresAt}
  onChange={(date) => setExpiresAt(date)}
  showTimeSelect
  timeIntervals={30}
  minDate={new Date()}
  dateFormat="dd MMM yyyy, h:mm aa"
  placeholderText="Select expiry date & time"
  wrapperClassName="w-full"
  popperPlacement="top-start"
  popperClassName="linklens-datepicker-popper"
  className="
    w-full
    rounded-xl
    border
    border-slate-700
    bg-[#131B2E]
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

  )}

</div>
  
  
</div>  
      
             

            {/* Footer */}

            <div className="flex justify-end gap-4 pt-4">

              <button
  onClick={() => {
    resetForm();
    onClose();
  }}
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