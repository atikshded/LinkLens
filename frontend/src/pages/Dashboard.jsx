import StatCard from "../components/dashboard/StatCard";
import ChartCard from "../components/dashboard/ChartCard";
import RecentLinks from "../components/dashboard/RecentLinks";
import BrowserCard from "../components/dashboard/BrowserCard";

import {
  FiMousePointer,
  FiLink2,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="flex h-96 items-center justify-center text-slate-400">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Clicks"
          value={dashboard.totalClicks.toLocaleString()}
          change="Updated today"
          badge="Live"
          icon={<FiMousePointer />}
        />

        <StatCard
          title="Total Links"
          value={dashboard.totalLinks}
          change="Updated today"
          badge="Active"
          icon={<FiLink2 />}
        />

        <StatCard
          title="Top Browser"
          value={dashboard.topBrowser}
          change="Currently active"
          badge="Healthy"
          icon={<FiTrendingUp />}
        />

        <StatCard
          title="Top Operating System"
          value={dashboard.topOperatingSystem}
          change="Highest traffic"
          badge="Top"
          icon={<FiGlobe />}
        />
      </div>

      {/* Click Activity */}
      <ChartCard
        data={dashboard.clicksLast7Days}
        totalClicks={dashboard.totalClicks}
      />

      {/* Browser Distribution */}
      <BrowserCard
        browsers={dashboard.browserDistribution}
      />

      {/* Recent Links */}
      <RecentLinks
        links={dashboard.recentLinks}
      />
    </div>
  );
}

export default Dashboard;