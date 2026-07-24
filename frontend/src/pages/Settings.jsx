import { useEffect, useState } from "react";
import {
  FiUser,
  FiBarChart2,
  FiInfo,
  FiTrash2,
} from "react-icons/fi";
import {
  getProfile,
  getStats,
  deleteAccount,
} from "../services/userService";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import toast from "react-hot-toast";

export default function Settings() {
  const [profile, setProfile] =useState(null);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [profileData, statsData] = await Promise.all([
        getProfile(),
        getStats(),
      ]);

      setProfile(profileData);
      setStats(statsData);
    } catch (err) {
    console.error(err);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
}
  }

  if (!profile || !stats) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account information.
        </p>
      </div>

      {/* Top Grid */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Profile */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7 backdrop-blur">

          <div className="mb-6 flex items-center gap-3">

            <div className="rounded-xl bg-violet-600/20 p-3 text-violet-400">
              <FiUser size={22} />
            </div>

            <h2 className="text-xl font-semibold text-white">
              Profile
            </h2>

          </div>

          <div className="space-y-6">

            <div>
              <p className="text-sm text-slate-400">Name</p>

              <p className="mt-1 text-lg font-semibold text-white">
                {profile.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Email</p>

              <p className="mt-1 text-lg text-white break-all">
                {profile.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Joined</p>

              <p className="mt-1 text-lg text-white">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>

        </div>

        {/* Activity */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7 backdrop-blur">

          <div className="mb-6 flex items-center gap-3">

            <div className="rounded-xl bg-violet-600/20 p-3 text-violet-400">
              <FiBarChart2 size={22} />
            </div>

            <h2 className="text-xl font-semibold text-white">
              Account Activity
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-2xl bg-slate-800 p-6">

              <p className="text-4xl font-bold text-violet-400">
                {stats.linksCreated}
              </p>

              <p className="mt-2 text-slate-400">
                Links Created
              </p>

            </div>

            <div className="rounded-2xl bg-slate-800 p-6">

              <p className="text-4xl font-bold text-violet-400">
                {stats.totalClicks}
              </p>

              <p className="mt-2 text-slate-400">
                Total Clicks
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* About */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7 backdrop-blur">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-violet-600/20 p-3 text-violet-400">
            <FiInfo size={22} />
          </div>

          <h2 className="text-xl font-semibold text-white">
            About LinkLens
          </h2>

        </div>

        <div className="space-y-2">

          <p className="text-white">
            <span className="font-semibold">Version:</span> 1.0
          </p>

          <p className="text-slate-400">
            Built with Spring Boot, React, PostgreSQL and Redis.
          </p>

        </div>

      </div>

      {/* Danger Zone */}

      <div className="rounded-3xl border border-red-500/40 bg-red-950/20 p-7">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-red-500/20 p-3 text-red-400">
            <FiTrash2 size={22} />
          </div>

          <h2 className="text-xl font-semibold text-red-400">
            Danger Zone
          </h2>

        </div>

        <p className="mb-6 max-w-xl text-slate-400">
          Deleting your account is permanent. All shortened links,
          analytics, and associated data will be removed forever.
        </p>

        <button
    onClick={() => setShowDeleteModal(true)}
    className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
>
          Delete Account
        </button>

      </div>
      <ConfirmationModal
  isOpen={showDeleteModal}
  title="Delete Account"
  message="Are you sure you want to permanently delete your account? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleDeleteAccount}
  onCancel={() => setShowDeleteModal(false)}
/>

    </div>
  );

async function handleDeleteAccount() {
  try {
    await deleteAccount();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Account deleted successfully.");

    navigate("/");

  } catch (err) {
    console.error(err);
    toast.error("Failed to delete account.");
  }
}
}