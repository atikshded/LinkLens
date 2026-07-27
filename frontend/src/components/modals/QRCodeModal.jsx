import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

function QRCodeModal({
  isOpen,
  onClose,
  linkId,
  shortUrl,
}) {
  if (!isOpen) return null;

  const qrUrl = `${import.meta.env.VITE_API_URL}/links/${linkId}/qr`;

  const handleDownload = async () => {
  try {
    const response = await fetch(qrUrl);

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `linklens-qr-${linkId}.png`;

    document.body.appendChild(a);
    a.click();
    toast.success("QR Code downloaded!");
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    toast.error("Failed to download QR Code");
}
};

  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
  onClick={onClose}
>

      <div
  onClick={(e) => e.stopPropagation()}
  className="w-[420px] rounded-3xl border border-slate-700 bg-[#131B2E] p-8 shadow-2xl">

        <h2 className="text-center text-2xl font-bold text-white">
          QR Code
        </h2>

        <p className="mt-2 text-center text-sm text-slate-400">
  Scan this QR code to visit your shortened link.
</p>

        <div className="mt-6 flex h-[320px] items-center justify-center">
          <img
            src={qrUrl}
            alt="QR Code"
            className="rounded-2xl bg-white p-2 shadow-lg"
          />
        </div>

        <p
  className="mt-5 text-center font-mono text-sm text-violet-400"
  title={shortUrl}
>
  /r/{shortUrl?.split("/r/")[1] || ""}
</p>

<button
  onClick={() => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied!");
  }}
  className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
>
  <FiCopy size={16} />
  Copy Short URL
</button>

        <div className="mt-8 flex gap-3">

          <button
            onClick={handleDownload}
            className="flex-1 rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            Download PNG
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-600 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default QRCodeModal;