import { useEffect, useState } from "react";
import {
  FiSearch,
  FiBell,
  FiPlus,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

function TopNavbar({ onCreateClick }) {
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
const isLinks = location.pathname === "/links";
const isAnalytics = location.pathname.startsWith("/analytics");
const isSettings = location.pathname === "/settings";

const showSearch = isLinks;
const showCreateButton = isDashboard || isLinks;
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name || "User";

  const hour = new Date().getHours();


  let greeting = "Good Evening";
  let subtitle = "Welcome back! Here's a quick overview of your links.";

  if (hour < 12) {
  greeting = "Good Morning";
  subtitle = "Welcome back! Let's make today productive.";
} else if (hour < 17) {
  greeting = "Good Afternoon";
  subtitle = "Hope you're having a productive day.";
}
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const scrollContainer = document.getElementById("dashboard-scroll");

  if (!scrollContainer) return;

  const handleScroll = () => {
    setScrolled(scrollContainer.scrollTop > 20);
  };

  scrollContainer.addEventListener("scroll", handleScroll);

  return () => {
    scrollContainer.removeEventListener("scroll", handleScroll);
  };
}, []);
  return (

    
   <header
  className={`
    sticky
    top-0
    z-30
    flex
    items-center
    justify-between
    px-8
    transition-all
    duration-300

    ${
     scrolled
  ? "h-[72px] bg-[#0B1120]/90 backdrop-blur-xl"
  : "h-[72px] bg-[#0B1120]"
    }
  `}
>
     {/* Left */}

<div>
  {isDashboard && (
    <>
      <h1 className="text-[1.5rem] leading-tight font-semibold tracking-tight text-white">
        {greeting}, {userName} 👋
      </h1>

      
      <p className="mt-0.5 text-sm text-slate-400">
        {subtitle}
      </p>
    </>
  )}
</div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        {showSearch && (
          <div className="relative">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search links..."
              className="
              h-11
              w-72
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              pl-11
              pr-4
              text-white
              outline-none
              transition
              focus:border-violet-500
            "
            />

          </div>
        )}

        {/* Create Button */}
{showCreateButton && (
        <button
          onClick={onCreateClick}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-3
            font-medium
            hover:scale-[1.03]
            active:scale-95
            transition-all
            duration-300
            text-white
            hover:bg-violet-700
          "
        >
          <FiPlus />

          Create Link

        </button>
        )}


        {/* Notification */}

        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-900
            text-slate-400
            hover:text-white
            hover:scale-110
            transition-all
            duration-300
            hover:rotate-12
          "
        >
          <FiBell size={18} />
        </button>

      </div>
    </header>
  );
}

export default TopNavbar;