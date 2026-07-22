import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-[#060816]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="LinkLens"
            className="h-11 w-11 rounded-xl object-cover"
          />

          <div>
            <h1 className="text-lg font-bold text-white">
              LinkLens
            </h1>

            <p className="text-xs text-slate-400">
              See Beyond the Click
            </p>
          </div>
        </Link>

        {/* Nav */}

        <nav className="hidden items-center gap-10 text-sm text-slate-300 lg:flex">

          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#dashboard" className="hover:text-white transition">
            Dashboard
          </a>

          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>

          <a href="https://github.com" className="hover:text-white transition">
            GitHub
          </a>

        </nav>

        {/* Right */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              rounded-xl
              bg-violet-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-violet-500
            "
          >
            Get Started
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;