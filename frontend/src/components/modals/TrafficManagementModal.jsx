import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiX,
} from "react-icons/fi";

import {
  getVariants,
  createVariant,
  updateVariant,
  deleteVariant,
} from "../../services/variantService";

function TrafficManagementModal({
  isOpen,
  onClose,
  linkId,
}) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const [adding, setAdding] = useState(false);

  const loadVariants = useCallback(async () => {
    if (!linkId) return;

    try {
      setLoading(true);
      const data = await getVariants(linkId);

      setVariants(
        data.map((variant) => ({
          ...variant,
          isNew: false,
        }))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load variants");
    } finally {
      setLoading(false);
    }
  }, [linkId]);

  useEffect(() => {
    if (isOpen) {
      loadVariants();
    }
  }, [isOpen, loadVariants]);

  const handleUrlChange = (id, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              destinationUrl: value,
            }
          : variant
      )
    );
  };

  const handleWeightChange = (id, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              weight: Number(value),
            }
          : variant
      )
    );
  };

  const totalWeight = variants.reduce(
    (sum, variant) => sum + (variant.weight || 0),
    0
  );

  const handleAdd = () => {
    if (totalWeight >= 100) {
        toast.error("Total weight already reached 100%");
        return;
    }

    const remaining = 100 - totalWeight;

    const tempId = Date.now();

    setVariants((prev) => [
        ...prev,
        {
            id: tempId,
            destinationUrl: "",
            weight: remaining,
            clickCount: 0,
            active: true,
            isNew: true,
        },
    ]);
};

  const handleSave = async (variant) => {
    if (!variant.destinationUrl.trim()) {
      toast.error("Destination URL is required");
      return;
    }

    if (variant.weight < 1 || variant.weight > 100) {
      toast.error("Weight must be between 1 and 100");
      return;
    }

    try {
      setSavingId(variant.id);

      if (variant.isNew) {
        const created = await createVariant(linkId, {
          destinationUrl: variant.destinationUrl,
          weight: variant.weight,
        });

        setVariants((prev) =>
          prev.map((v) =>
            v.id === variant.id
              ? {
                  ...created,
                  isNew: false,
                }
              : v
          )
        );

        toast.success("Variant created");
      } else {
        const updated = await updateVariant(
          linkId,
          variant.id,
          {
            destinationUrl: variant.destinationUrl,
            weight: variant.weight,
          }
        );

        setVariants((prev) =>
          prev.map((v) =>
            v.id === variant.id
              ? {
                  ...updated,
                  isNew: false,
                }
              : v
          )
        );

        toast.success("Variant updated");
      }
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (variant) => {
    if (
      !window.confirm(
        "Delete this variant?"
      )
    ) {
      return;
    }

    if (variant.isNew) {
      setVariants((prev) =>
        prev.filter((v) => v.id !== variant.id)
      );
      return;
    }

    try {
      await deleteVariant(linkId, variant.id);

      setVariants((prev) =>
        prev.filter((v) => v.id !== variant.id)
      );

      toast.success("Variant deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete variant");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-700 bg-[#131B2E] shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-700 px-8 py-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Traffic Management
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage A/B testing variants and traffic distribution.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
          >
            <FiX size={20} />
          </button>

        </div>

        <div className="max-h-[65vh] overflow-y-auto p-8">

          {loading ? (

            <div className="py-20 text-center text-slate-400">
              Loading variants...
            </div>

          ) : (

                      <>
            {variants.length === 0 ? (

  <div className="flex flex-col items-center justify-center py-20">

    <div className="mb-5 rounded-full bg-indigo-500/20 p-5">
  <FiPlus
    size={34}
    className="text-indigo-400"
  />
</div>

    <h3 className="mb-2 text-2xl font-bold text-white">
      No Variants Yet
    </h3>

    <p className="mb-8 max-w-md text-center text-slate-400">
      This link currently redirects to a single destination.
      Create your first variant to start A/B testing and traffic distribution.
    </p>

   <button
  onClick={handleAdd}
  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
>
  <FiPlus size={18} />
  Create First Variant
</button>

<p className="mt-4 text-sm text-slate-500">
  The first variant will automatically receive 100% of the traffic.
</p>

  </div>

) : (

              <div className="space-y-6">

                {variants.map((variant, index) => (

                  <div
                    key={variant.id}
                    className="rounded-2xl border border-slate-700 bg-[#192235] p-6"
                  >

                    <div className="mb-6 flex items-center justify-between">

                      <div>

                        <div className="flex items-center gap-3">

                          <h3 className="text-lg font-semibold text-white">
                            Variant {index + 1}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              variant.active
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {variant.active ? "Active" : "Inactive"}
                          </span>

                          {variant.isNew && (
                            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                              New
                            </span>
                          )}

                        </div>

                        <p className="mt-2 text-sm text-slate-400">
                          {variant.clickCount} Clicks
                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() => handleSave(variant)}
                          disabled={savingId === variant.id}
                          className="rounded-xl bg-emerald-600 p-3 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <FiSave size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(variant)}
                          className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
                        >
                          <FiTrash2 size={18} />
                        </button>

                      </div>

                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                      <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Destination URL
                        </label>

                        <input
                          type="text"
                          value={variant.destinationUrl}
                          onChange={(e) =>
                            handleUrlChange(
                              variant.id,
                              e.target.value
                            )
                          }
                          placeholder="https://example.com"
                          className="w-full rounded-xl border border-slate-700 bg-[#131B2E] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                        />

                      </div>

                      <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Traffic Weight (%)
                        </label>

                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={variant.weight}
                          onChange={(e) =>
                            handleWeightChange(
                              variant.id,
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-slate-700 bg-[#131B2E] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                        />

                      </div>

                    </div>

                  </div>

                ))}

                <div className="rounded-2xl border border-slate-700 bg-[#192235] p-6">

                  <div className="flex items-center justify-between">

                    <span className="text-lg font-semibold text-white">
                      Total Traffic Weight
                    </span>

                    <span
                      className={`text-xl font-bold ${
                        totalWeight === 100
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {totalWeight}%
                    </span>

                  </div>

                  {totalWeight !== 100 && (

                    <p className="mt-3 text-sm text-red-400">
                      Total weight must equal exactly 100%.
                    </p>

                  )}

                </div>

                <div className="flex justify-end">

                  <button
                    onClick={handleAdd}
                    disabled={adding}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                  >
                    <FiPlus size={18} />

                    Add Variant

                  </button>

                </div>

              </div>

            )}

                         </>
        )}
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-slate-700 px-8 py-5">

          <div className="text-sm text-slate-400">
  {variants.length === 0
    ? "No variants configured"
    : `${variants.length} Variant${variants.length !== 1 ? "s" : ""}`}
</div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-600 px-6 py-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default TrafficManagementModal;