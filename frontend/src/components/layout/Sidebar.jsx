import {
  FiHome,
  FiLink2,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../modals/ConfirmationModal";
import logo from "../../assets/logo.jpeg";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FiHome size={20} />,
  },
  {
    name: "My Links",
    path: "/links",
    icon: <FiLink2 size={20} />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <FiBarChart2 size={20} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FiSettings size={20} />,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

const userName = user?.name || "User";
const userEmail = user?.email || "LinkLens User";

const handleLogoutClick = () => {
  setShowLogoutModal(true);
};

  const handleLogout = () => {
  setShowLogoutModal(false);
  localStorage.removeItem("token");
localStorage.removeItem("user");
  navigate("/");
};

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-[#0B1120]">

      {/* Logo */}

      <div className="border-b border-slate-800 px-7 py-7">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="LinkLens"
            className="h-11 w-11 rounded-xl"
          />

          <div>

            <h1 className="text-2xl font-bold text-white">
              LinkLens
            </h1>

            <p className="text-xs text-slate-400">
              See Beyond the Click
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-8">

        <div className="space-y-2">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                rounded-2xl
                px-5
                py-4
                text-base
                font-medium
                transition-all
                duration-500
                ease-out

                ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}

        </div>

      </nav>

      {/* Bottom */}

      <div className="border-t border-slate-800 p-5">

        <div className="mb-5 flex items-center gap-3 rounded-2xl bg-slate-800/60 p-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div>

            <p className="font-medium text-white">
  {userName}
</p>

            <p className="text-xs text-slate-400 truncate">
  {userEmail}
</p>

          </div>

        </div>

        <button
          onClick={handleLogoutClick}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            text-slate-400
            transition-all
            duration-200
            hover:bg-red-500/10
            hover:text-red-400
          "
        >
          <FiLogOut size={20} />

          Logout

        </button>

      </div>

      <ConfirmationModal
  isOpen={showLogoutModal}
  title="Log Out"
  message="Are you sure you want to log out?"
  confirmText="Log Out"
  cancelText="Cancel"
  onConfirm={handleLogout}
  onCancel={() => setShowLogoutModal(false)}
/>

    </aside>
  );
}

export default Sidebar;