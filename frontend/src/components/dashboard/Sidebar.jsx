import {
  FiGrid,
  FiLink,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid />,
  },
  {
    title: "My Links",
    path: "/links",
    icon: <FiLink />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <FiBarChart2 />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];

function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-[#0A0F1F]">

      {/* Logo */}

      <div className="border-b border-slate-800 p-8">

        <h1 className="text-2xl font-bold text-white">
          LinkLens
        </h1>

        <p className="mt-1 text-sm text-violet-400">
          See Beyond the Click
        </p>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-6">

        {menu.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            {item.icon}

            {item.title}

          </NavLink>

        ))}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-6">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-900 hover:text-white">

          <FiLogOut />

          Logout

        </button>

      </div>

    </aside>
  );
}

function logout() {

    localStorage.removeItem("token");

    navigate("/");
}

export default Sidebar;