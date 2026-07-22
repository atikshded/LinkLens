import StatCard from "../components/dashboard/StatCard";
import ChartCard from "../components/dashboard/ChartCard";
import RecentLinks from "../components/dashboard/RecentLinks";
import CountryCard from "../components/dashboard/CountryCard";
import DeviceCard from "../components/dashboard/DeviceCard";


import {
  FiMousePointer,
  FiLink2,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

function Dashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back! Here's an overview of your links.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard title="Total Clicks" value="12,486" icon={<FiMousePointer />} />
        <StatCard title="Links" value="184" icon={<FiLink2 />} />
        <StatCard title="Countries" value="37" icon={<FiGlobe />} />
        <StatCard title="CTR" value="82%" icon={<FiTrendingUp />} />

      </div>

      <ChartCard />

      <div className="grid gap-6 lg:grid-cols-2">

        <CountryCard />

        <DeviceCard />

      </div>

      <RecentLinks />

    </div>
  );
}

export default Dashboard;