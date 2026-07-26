import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getMyLinks, deleteLink } from "../services/linkService";
import {
  FiCopy,
  FiExternalLink,
  FiBarChart2,
  FiTrash2,
  FiGlobe,
  FiSearch,
  FiPlus,
  FiGitBranch,
} from "react-icons/fi";
import { MdQrCode2 } from "react-icons/md";
import toast from "react-hot-toast";
import FilterSelect from "../components/filters/FilterSelect";
import FilterDatePicker from "../components/filters/FilterDatePicker";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import QRCodeModal from "../components/modals/QRCodeModal";
import TrafficManagementModal from "../components/modals/TrafficManagementModal";


function Links() {
  const navigate = useNavigate();

  const { onCreateClick, registerRefresh } = useOutletContext();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [createdDate, setCreatedDate] = useState("");

const [statusFilter, setStatusFilter] = useState("ALL");

const [variantFilter, setVariantFilter] = useState("ALL");

const [sortBy, setSortBy] = useState("NEWEST");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedQRLinkId, setSelectedQRLinkId] = useState(null);
  const [selectedShortUrl, setSelectedShortUrl] = useState("");
  const [showTrafficModal, setShowTrafficModal] = useState(false);
const [selectedTrafficLinkId, setSelectedTrafficLinkId] = useState(null);

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

  const filteredLinks = [...links]
  .filter((link) => {
    // Search
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      link.originalUrl.toLowerCase().includes(search) ||
      link.shortCode.toLowerCase().includes(search);

    if (!matchesSearch) return false;

    // Status

    if (statusFilter === "ACTIVE" && link.expired) {
      return false;
    }

    if (statusFilter === "EXPIRED" && !link.expired) {
      return false;
    }

    // Variants

    if (
      variantFilter === "WITH" &&
      link.variantCount <= 1
    ) {
      return false;
    }

    if (
      variantFilter === "WITHOUT" &&
      link.variantCount > 1
    ) {
      return false;
    }

    // Created Date
// Created Date

if (createdDate) {
  const selected = new Date(createdDate);
  const linkCreated = new Date(link.createdAt);

  const sameDate =
    selected.getDate() === linkCreated.getDate() &&
    selected.getMonth() === linkCreated.getMonth() &&
    selected.getFullYear() === linkCreated.getFullYear();

  if (!sameDate) {
    return false;
  }
}

return true;
    


  })
  .sort((a, b) => {
    switch (sortBy) {
      case "NEWEST":
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );

      case "OLDEST":
        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );

      case "MOST_CLICKS":
        return b.clickCount - a.clickCount;

      case "LEAST_CLICKS":
        return a.clickCount - b.clickCount;

      default:
        return 0;
    }
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
    <div className="space-y-5">

      {/* Header */}
      <div className="mb-10 flex items-center justify-between">

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

       <div className="flex flex-col items-end gap-4">

  <div className="flex flex-wrap items-center justify-end gap-3">

    {/* Search */}

    {/* Date */}

    {/* Status */}

    {/* Variants */}

    {/* Sort */}

    {/* Reset */}

  </div>

  <button
  onClick={onCreateClick}
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
    transition
    hover:bg-violet-700
  "
>
  <FiPlus size={18} />
  <span>Create Link</span>
</button>

</div>

          
  
    

      </div>

      
    {/* Filters */}

<div className="rounded-2xl border border-slate-800 bg-[#131B2E] p-5">

<div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center">

    {/* Search */}

    <div className="relative w-full">

      <FiSearch
        size={17}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        placeholder="Search URL..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-slate-700
          bg-[#192235]
          pl-11
          pr-4
          text-white
          outline-none
          transition
          focus:border-violet-500
        "
      />

    </div>

    {/* Status */}

    <div className="w-44">

      <FilterSelect
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          {
            value: "ALL",
            label: "All Status",
          },
          {
            value: "ACTIVE",
            label: "Active",
          },
          {
            value: "EXPIRED",
            label: "Expired",
          },
        ]}
      />

    </div>

    {/* Variants */}

    <div className="w-48">

      <FilterSelect
        value={variantFilter}
        onChange={setVariantFilter}
        options={[
          {
            value: "ALL",
            label: "All Links",
          },
          {
            value: "WITH",
            label: "With Variants",
          },
          {
            value: "WITHOUT",
            label: "Without Variants",
          },
        ]}
      />

    </div>

    {/* Created Date */}

    <div className="w-52">

      <FilterDatePicker
        value={createdDate ? new Date(createdDate) : null}
        onChange={(date) => {
          if (!date) {
            setCreatedDate("");
            return;
          }

          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          setCreatedDate(`${year}-${month}-${day}`);
        }}
      />

    </div>

    {/* Sort */}

    <div className="w-52">

      <FilterSelect
        value={sortBy}
        onChange={setSortBy}
        options={[
          {
            value: "NEWEST",
            label: "Newest",
          },
          {
            value: "OLDEST",
            label: "Oldest",
          },
          {
            value: "MOST_CLICKS",
            label: "Most Clicked",
          },
          {
            value: "LEAST_CLICKS",
            label: "Least Clicked",
          },
        ]}
      />

    </div>

    {/* Reset */}

<button
  onClick={() => {
    setSearchTerm("");
    setCreatedDate("");
    setStatusFilter("ALL");
    setVariantFilter("ALL");
    setSortBy("NEWEST");
  }}
  className="
    h-11
    rounded-xl
    border
    border-slate-700
    px-5
    text-sm
    font-medium
    text-slate-300
    transition
    hover:border-violet-500
    hover:text-violet-300
  "
>
  Reset
</button>

    

    {/* Create Button */}

  

  </div>

</div>

{/* Results */}

{/* Links Table */}

<div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#131B2E]">
        <table className="w-full">

          <thead className="border-b border-slate-800">

            <tr className="text-left text-sm uppercase tracking-wider text-slate-400">

              <th className="px-6 py-4">
                Original URL
              </th>

              <th className="px-6 py-4">
                Short URL
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Expires
              </th>

              <th className="px-6 py-4">
                Clicks
              </th>

              <th className="px-6 py-4">
                Created
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                        {filteredLinks.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="px-6 py-16 text-center"
                >

                  <div className="flex flex-col items-center">

                    <FiSearch
                      size={48}
                      className="mb-4 text-slate-500"
                    />

                    <h3 className="text-xl font-semibold text-white">
    No links found
</h3>

<p className="mt-2 text-slate-400">
    {links.length === 0
        ? "Create your first short link to get started."
        : "Try changing or clearing your filters."}
</p>

                  </div>

                </td>

              </tr>

            ) : (

              filteredLinks.map((link) => (

                <tr
                  key={link.id}
                  className="border-b border-slate-800 transition-all duration-200 hover:bg-slate-800/50"
                >

                  {/* Original URL */}
                  <td className="max-w-sm px-6 py-5">

                    <div
                      className="flex items-center gap-2 truncate font-medium text-white"
                      title={link.originalUrl}
                    >
                      <FiGlobe
                        size={16}
                        className="flex-shrink-0 text-sky-400"
                      />

                      <span className="truncate">
                        {new URL(link.originalUrl).hostname}
                      </span>

                    </div>

                  </td>

                  {/* Short URL */}
<td className="px-6 py-5">

  <div className="flex flex-col gap-2">

    <div
      className="font-mono font-medium text-violet-400"
      title={link.shortUrl}
    >
      {new URL(link.shortUrl).pathname}
    </div>

    {link.variantCount > 1 && (
      <span className="w-fit rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
        {link.variantCount} Variants
      </span>
    )}

  </div>

</td>

                  {/* Status */}
                  <td className="px-6 py-5">

                    

                     

                     {link.expired ? (

  <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-400">
    EXPIRED
  </span>

) : (

  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
    ACTIVE
  </span>

)}

                  </td>

                  {/* Expires */}
                  <td
                    className="px-6 py-5"
                    title={
                      link.expiresAt
                        ? new Date(link.expiresAt).toLocaleString()
                        : ""
                    }
                  >

                    {link.expiresAt ? (

                      link.expired ? (

                        <span className="font-medium text-red-400">
                          Expired
                        </span>

                      ) : (

                        <span className="text-slate-300">
                          {formatDate(link.expiresAt)}
                        </span>

                      )

                    ) : (

                      <span className="font-medium text-emerald-400">
                        Never
                      </span>

                    )}

                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-5">

                    <span className="rounded-full bg-violet-600/15 px-3 py-1 text-sm font-semibold text-violet-300">
                      {link.clickCount} Click
                      {link.clickCount !== 1 ? "s" : ""}
                    </span>

                  </td>

                  {/* Created */}
                  <td
                    className="px-6 py-5 text-slate-400"
                    title={new Date(link.createdAt).toLocaleString()}
                  >
                    {formatDate(link.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <div className="flex items-center justify-center">

                      {/* Link Actions */}
                      <div className="flex items-center gap-1">

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
                          onClick={() =>
                            window.open(link.originalUrl, "_blank")
                          }
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                        >
                          <FiExternalLink size={18} />
                        </button>

                      </div>

                      <div className="mx-3 h-5 w-px bg-slate-700" />

                      {/* Management */}
                      <div className="flex items-center gap-1">

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
                          onClick={() =>
                            navigate(`/analytics/${link.id}`)
                          }
                          className="rounded-lg p-2 text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300"
                        >
                          <FiBarChart2 size={18} />
                        </button>

                        <button
                          title="Traffic Management"
                          onClick={() => {
                            setSelectedTrafficLinkId(link.id);
                            setShowTrafficModal(true);
                          }}
                          className="rounded-lg p-2 text-cyan-400 transition hover:bg-cyan-500/10 hover:text-cyan-300"
                        >
                          <FiGitBranch size={18} />
                        </button>

                      </div>

                      <div className="mx-3 h-5 w-px bg-slate-700" />

                      {/* Delete */}
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

      <TrafficManagementModal
  isOpen={showTrafficModal}
  onClose={() => {
    setShowTrafficModal(false);
    setSelectedTrafficLinkId(null);
  }}
  linkId={selectedTrafficLinkId}
/>

    </div>

    
  );
}

export default Links;