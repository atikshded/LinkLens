import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#060816]">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Side */}

      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;