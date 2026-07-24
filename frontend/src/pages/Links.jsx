import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getMyLinks, deleteLink } from "../services/linkService";
import {
  FiCopy,
  FiExternalLink,
  FiBarChart2,
  FiTrash2,
} from "react-icons/fi";
import { MdQrCode2 } from "react-icons/md";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import QRCodeModal from "../components/modals/QRCodeModal";

function Links() {
  const navigate = useNavigate();
  const { onCreateClick, registerRefresh } = useOutletContext();
  const [links, setLinks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedQRLinkId, setSelectedQRLinkId] = useState(null);
  const [selectedShortUrl, setSelectedShortUrl] = useState("");

  useEffect(() => {
  fetchLinks();
  registerRefresh(() => () => {
  fetchLinks();
});

  return () => registerRefresh(null);
}, []);

  const fetchLinks = async () => {
    try {
      const data = await getMyLinks();
      setLinks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
  setSelectedLinkId(id);
  setShowDeleteModal(true);
};

const handleConfirmDelete = async () => {
  try {
    await deleteLink(selectedLinkId);

    setLinks((prev) =>
      prev.filter((link) => link.id !== selectedLinkId)
    );

    toast.success("Link deleted");
  } catch (error) {
    toast.error("Failed to delete link");
  } finally {
    setShowDeleteModal(false);
    setSelectedLinkId(null);
  }
};

const handleCancelDelete = () => {
  setShowDeleteModal(false);
  setSelectedLinkId(null);
};

const filteredLinks = links.filter((link) => {
  const search = searchTerm.toLowerCase();

  return (
    link.originalUrl.toLowerCase().includes(search) ||
    link.shortCode.toLowerCase().includes(search)
  );
});

if (loading) {
  return (
    <div className="flex h-64 items-center justify-center">
      <p className="text-lg text-slate-400">
        Loading your links...
      </p>
    </div>
  );
}
  return (
  <div className="space-y-8">

    {/* Header */}
    <div className="mb-10 flex items-center justify-between">

  <div>

    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/15 text-2xl">
        🔗
      </div>

      <div>

        <h1 className="text-4xl font-bold text-white">
          My Links
        </h1>

        <p className="mt-1 text-slate-400">
          Manage, search and organize your shortened URLs.
        </p>

      </div>

    </div>

  </div>

  <div className="flex items-center gap-4">

    <input
  type="text"
  placeholder="Search links..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="h-11 w-80 rounded-xl border border-slate-700 bg-[#131B2E] px-4 text-white outline-none transition focus:border-violet-500"
 />

    <button
  onClick={onCreateClick}
      className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
    >
      + Create Link
    </button>

  </div>

</div>

    {/* Table Card */}
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#131B2E]">

      <table className="w-full">

        <thead className="border-b border-slate-800 bg-[#192235]">

          <tr className="text-left text-sm uppercase tracking-wider text-slate-400">

            <th className="px-6 py-4">Original URL</th>

            <th className="px-6 py-4">Short URL</th>

            <th className="px-6 py-4">Clicks</th>

            <th className="px-6 py-4">Created</th>

            <th className="px-6 py-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

  {filteredLinks.length === 0 ? (

    <tr>

      <td
        colSpan={5}
        className="px-6 py-16 text-center"
      >

        <div className="flex flex-col items-center">

          <div className="mb-4 text-5xl">
            🔍
          </div>

          <h3 className="text-xl font-semibold text-white">
            No matching links found
          </h3>

          <p className="mt-2 text-slate-400">
            Try searching with a different URL or short code.
          </p>

        </div>

      </td>

    </tr>

  ) : (

    filteredLinks.map((link) => (

      <tr
        key={link.id}
        className="border-b border-slate-800 transition-all duration-200 hover:bg-slate-800/40"
      >

        <td className="max-w-sm px-6 py-5 text-white">

          <p
            className="truncate font-medium text-white"
            title={link.originalUrl}
          >
            🌐 {new URL(link.originalUrl).hostname}
          </p>

        </td>

        <td className="px-6 py-5">

          <span className="font-mono font-medium text-violet-400">
            /r/{link.shortCode}
          </span>

        </td>

        <td className="px-6 py-5">

          <span className="rounded-full bg-violet-600/15 px-3 py-1 text-sm font-semibold text-violet-300">
            {link.clickCount} Click{link.clickCount !== 1 ? "s" : ""}
          </span>

        </td>

        <td className="px-6 py-5 text-slate-400">
          {new Date(link.createdAt).toLocaleDateString()}
        </td>

        <td className="px-6 py-5">

          <div className="flex items-center justify-center gap-3">

            <button
              title="Copy Link"
              onClick={() => {
                navigator.clipboard.writeText(link.shortUrl);
                toast.success("Short URL copied!");
              }}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              <FiCopy size={18} />
            </button>

            <button
              title="Open Original URL"
              onClick={() => window.open(link.originalUrl, "_blank")}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              <FiExternalLink size={18} />
            </button>

            <button
              title="QR Code"
              onClick={() => {
                setSelectedQRLinkId(link.id);
                setSelectedShortUrl(link.shortUrl);
                setShowQRModal(true);
              }}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              <MdQrCode2 size={20} />
            </button>

            <button
              title="Analytics"
              onClick={() => navigate(`/analytics/${link.id}`)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              <FiBarChart2 size={18} />
            </button>

            <button
              title="Delete"
              onClick={() => handleDeleteClick(link.id)}
              className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <FiTrash2 size={18} />
            </button>

          </div>

        </td>

      </tr>

    ))

  )}

</tbody>

           

                    
  

   

      </table>

    </div>
    <QRCodeModal
  isOpen={showQRModal}
  onClose={() => setShowQRModal(false)}
  linkId={selectedQRLinkId}
  shortUrl={selectedShortUrl}
/>
    <ConfirmationModal
  isOpen={showDeleteModal}
  title="Delete Link"
  message="Are you sure you want to delete this link? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleConfirmDelete}
  onCancel={handleCancelDelete}
/>

  </div>
  
);
}

export default Links;