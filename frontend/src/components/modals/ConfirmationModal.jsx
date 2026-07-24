import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
    useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  if (isOpen) {
    window.addEventListener("keydown", handleEscape);
  }

  return () => {
    window.removeEventListener("keydown", handleEscape);
  };
}, [isOpen, onCancel]);
  if (!isOpen) return null;

  return (
    <div
  onClick={onCancel}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
>
      <div
  onClick={(e) => e.stopPropagation()}
  className="w-full max-w-md rounded-2xl border border-gray-700 bg-[#111827] p-6 shadow-2xl"
>
        <div className="flex items-center gap-3">
  <Trash2 className="h-7 w-7 text-red-500" />
  <h2 className="text-2xl font-bold text-white">
    {title}
  </h2>
</div>

        <p className="mt-3 text-gray-300">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-violet-300 transition hover:bg-violet-500/20"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;