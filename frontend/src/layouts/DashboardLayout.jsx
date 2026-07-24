import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import { useState } from "react";
import CreateLinkModal from "../components/modals/CreateLinkModal";



function DashboardLayout() {
  const location = useLocation();

const showTopNavbar =
  location.pathname === "/dashboard";
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshCallback, setRefreshCallback] = useState(null);
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#070B1A] via-[#0B1120] to-[#111827] text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {showTopNavbar && (
  <TopNavbar
    onCreateClick={() => setIsCreateModalOpen(true)}
  />
)}
        <main
    id="dashboard-scroll"
    className="flex-1 overflow-y-auto px-10 pb-10 pt-10"
>
          <div className="mx-auto max-w-7xl">
            <Outlet
  context={{
    onCreateClick: () => setIsCreateModalOpen(true),
    registerRefresh: setRefreshCallback,
  }}
/>
          </div>
        </main>
        <CreateLinkModal
  open={isCreateModalOpen}
  onClose={() => setIsCreateModalOpen(false)}
  onSuccess={() => {
    if (refreshCallback) {
      refreshCallback();
    }
  }}
/>
      </div>
    </div>
  );
}

export default DashboardLayout;