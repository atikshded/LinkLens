import { useEffect, useState } from "react";
import {
    Copy,
    Link as LinkIcon,
    Globe,
    Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
    getAnalytics,
    getDailyClicks,
    getVariantPerformance,
    getAiSummary,
} from "../services/analyticsService";

import VariantPerformanceTable from "../components/analytics/VariantPerformanceTable";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(true);
  const [dailyClicks, setDailyClicks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const hasSelectedLink = Boolean(id);
  const [variantPerformance, setVariantPerformance] = useState([]);

  const copyShortUrl = async () => {
  try {
    await navigator.clipboard.writeText(analytics.shortUrl);
    toast.success("Short URL copied!");
  } catch {
    toast.error("Failed to copy.");
  }
};
const copySummary = async () => {

    try {

        await navigator.clipboard.writeText(aiSummary);

        toast.success("AI summary copied!");

    } catch {

        toast.error("Failed to copy summary.");

    }

};

  const browserData = analytics
    ? Object.entries(analytics.browserDistribution).map(
        ([name, value]) => ({
          name,
          value,
        })
      )
    : [];

  const osData = analytics
    ? Object.entries(
        analytics.operatingSystemDistribution
      ).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const COLORS = [
    "#8B5CF6",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
  ];

  useEffect(() => {
    if (!hasSelectedLink) {
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const [
    analyticsData,
    dailyClicksData,
    variantPerformanceData,
    aiSummaryData,
] = await Promise.all([
    getAnalytics(id),
    getDailyClicks(id),
    getVariantPerformance(id),
    getAiSummary(id),
]);

        setAnalytics(analyticsData);
        setDailyClicks(dailyClicksData);
        setVariantPerformance(variantPerformanceData);
        setAiSummary(aiSummaryData.summary);
setAiLoading(false);
      } catch (error) {
        setAiLoading(false);
        console.error(
          "Failed to load analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id, hasSelectedLink]);

  if (!hasSelectedLink) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="max-w-md rounded-3xl border border-slate-800 bg-[#131B2E] p-10 text-center shadow-xl">

          <div className="mb-6 text-6xl">
            📊
          </div>

          <h2 className="text-3xl font-bold text-white">
            No Link Selected
          </h2>

          <p className="mt-4 text-slate-400">
            Choose a link from{" "}
            <span className="font-semibold text-white">
              My Links
            </span>{" "}
            to view detailed analytics.
          </p>

          <button
            onClick={() => navigate("/links")}
            className="mt-8 rounded-2xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            View My Links
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg text-slate-400">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <div>

      <div className="mb-10">
      <h1 className="text-4xl font-bold text-white">
    Analytics Dashboard
</h1>

<p className="mt-2 text-slate-400">
    Monitor traffic, browsers and operating systems for your shortened URLs.
</p>

{analytics && (
  <div className="mt-6 rounded-2xl border border-slate-800 bg-[#131B2E] p-5">

    {/* Short URL */}

    <div className="flex items-start justify-between gap-4">

      <div className="flex-1">

        <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
          <LinkIcon size={14} />
          Short URL
        </p>

        <a
          href={analytics.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block break-all font-medium text-slate-300 transition hover:text-white hover:underline"
        >
          {analytics.shortUrl}
        </a>

      </div>

      <button
        onClick={copyShortUrl}
        className="rounded-xl border border-slate-700 p-2 text-slate-400 transition hover:border-violet-500 hover:text-violet-400"
        title="Copy Short URL"
      >
        <Copy size={18} />
      </button>

    </div>

    <div className="my-5 border-t border-slate-800" />

    {/* Original URL */}

    <div>

      <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
        <Globe size={14} />
        Original URL
      </p>

      <a
        href={analytics.originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block break-all text-slate-300 transition hover:text-white hover:underline"
      >
        {analytics.originalUrl}
      </a>

    </div>

  </div>
)}
<div className="mt-8 mb-10 rounded-3xl border border-slate-800 bg-gradient-to-r from-[#151E33] via-[#19223B] to-[#1B2440] p-8 shadow-xl">

<div className="mb-7 flex items-start justify-between">

    <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15">
            <Sparkles
                size={28}
                className="text-violet-400"
            />
        </div>

        <div>

            <div className="flex items-center gap-3">

                <h2 className="text-[30px] font-bold text-white">
                    AI Insights
                </h2>

                <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
                    Gemini
                </span>

            </div>

            <p className="mt-1 text-sm text-slate-400">
                AI-powered analysis of your link performance
            </p>

        </div>

    </div>

    <button
        onClick={copySummary}
        className="rounded-2xl border border-slate-700 bg-slate-900/20 p-3 text-slate-400 transition hover:border-violet-500 hover:text-violet-400"
        title="Copy AI Summary"
    >
        <Copy size={18} />
    </button>

</div>

<div className="mb-7 border-t border-slate-700/60"></div>

    {aiLoading ? (

        <div className="animate-pulse space-y-3">

    <div className="h-4 w-full rounded bg-slate-700"></div>

    <div className="h-4 w-11/12 rounded bg-slate-700"></div>

    <div className="h-4 w-10/12 rounded bg-slate-700"></div>

    <div className="h-4 w-8/12 rounded bg-slate-700"></div>

</div>

    ) : (

        <p className="mt-3 whitespace-pre-line text-[17px] leading-9 text-slate-300">
            {aiSummary}
        </p>

    )}

</div>
   
    
      </div>
            {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="group rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl transition-transform duration-300 group-hover:scale-110">
    📈
</div>

          <h2 className="mt-4 text-4xl font-bold text-white">
            {analytics.totalClicks}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Total Clicks
          </p>

        </div>

        <div className="group rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl transition-transform duration-300 group-hover:scale-110">
    🌐
</div>

          <h2 className="mt-4 text-3xl font-bold text-white">
            {analytics.topBrowser}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Top Browser
          </p>

        </div>

        <div className="group rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl transition-transform duration-300 group-hover:scale-110">
    💻
</div>

          <h2 className="mt-4 text-3xl font-bold text-white">
            {analytics.topOperatingSystem}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Top Operating System
          </p>

        </div>

        <div className="group rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl transition-transform duration-300 group-hover:scale-110">
    🕒
</div>

         <div className="mt-4 font-bold text-white">
  {analytics.lastClickedAt ? (
    <>
      <div>
        {new Date(analytics.lastClickedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>

      <div className="mt-1 text-base">
        {new Date(analytics.lastClickedAt).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </>
  ) : (
    "No Clicks"
  )}
</div>

    

          <p className="mt-2 text-sm text-slate-400">
            Last Click
          </p>

        </div>

      </div>

      {/* Daily Traffic */}

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl">

        <h2 className="mb-8 text-2xl font-bold text-white">
          📈 Daily Traffic
        </h2>

        {dailyClicks.length === 0 ? (

          <div className="flex h-44 flex-col items-center justify-center">

            <div className="mb-3 text-4xl">
    📊
</div>

            <h3 className="text-lg font-semibold text-white">
              Not enough data yet
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              More clicks are needed before we can display traffic trends.
            </p>

          </div>

        ) : (

          <ResponsiveContainer width="100%" height={380}>

            <LineChart data={dailyClicks}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })
                }
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#131B2E",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ r: 5 }}
                animationDuration={1000}
              />

            </LineChart>

          </ResponsiveContainer>

        )}

      </div>

            {/* Pie Charts */}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        {/* Browser Distribution */}

        <div className="rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl transition-all duration-300 hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">

          <h2 className="mb-8 text-2xl font-bold text-white">
            🌐 Traffic by Browser
          </h2>

          {browserData.length === 0 ? (

            <div className="flex h-64 items-center justify-center text-slate-400">
              No browser data yet.
            </div>

          ) : (

            <div className="flex h-64 items-center justify-evenly">

              <div className="h-64 w-64">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie
                      data={browserData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={38}
                      outerRadius={75}
                      label={false}
                      isAnimationActive
                      animationDuration={1200}
                    >
                      {browserData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      cursor={{ stroke: "#8B5CF6" }}
                      contentStyle={{
                        backgroundColor: "#131B2E",
                        border: "1px solid #475569",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />

                  </PieChart>
                  

                </ResponsiveContainer>
                
                

              </div>

              <div className="w-44 space-y-3">

                {browserData.map((item, index) => (

                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl bg-slate-800/40 px-3 py-2"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[index % COLORS.length],
                        }}
                      />

                      <span className="text-slate-300">
                        {item.name}
                      </span>

                    </div>

                    <span className="font-bold text-white">
                      {item.value}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

        {/* Operating System Distribution */}

        <div className="rounded-3xl border border-slate-800 bg-[#131B2E] p-6 shadow-xl transition-all duration-300 hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">

          <h2 className="mb-8 text-2xl font-bold text-white">
            💻 Traffic by Operating System
          </h2>

          {osData.length === 0 ? (

            <div className="flex h-64 items-center justify-center text-slate-400">
              No operating system data yet.
            </div>

          ) : (

            <div className="flex h-64 items-center justify-evenly">

              <div className="h-64 w-64">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie
                      data={osData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={38}
                      outerRadius={75}
                      label={false}
                      isAnimationActive
                      animationDuration={1200}
                    >
                      {osData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      cursor={{ stroke: "#8B5CF6" }}
                      contentStyle={{
                        backgroundColor: "#131B2E",
                        border: "1px solid #475569",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />

                  </PieChart>

                </ResponsiveContainer>

              </div>

              <div className="w-44 space-y-3">

                {osData.map((item, index) => (

                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl bg-slate-800/40 px-3 py-2"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[index % COLORS.length],
                        }}
                      />

                      <span className="text-slate-300">
                        {item.name}
                      </span>

                    </div>

                    <span className="font-bold text-white">
                      {item.value}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>
      <VariantPerformanceTable variants={variantPerformance} />
      </div>

  );
}

export default Analytics;