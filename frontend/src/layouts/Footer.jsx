import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-14">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 md:flex-row">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="LinkLens"
            className="h-11 w-11 rounded-xl"
          />

          <div>

            <h3 className="font-semibold text-white">
              LinkLens
            </h3>

            <p className="text-sm text-slate-400">
              See Beyond the Click
            </p>

          </div>

        </Link>

        {/* Tech */}

        <div className="flex flex-wrap items-center gap-8 text-sm text-slate-400">

          <span>Spring Boot</span>

          <span>React</span>

          <span>PostgreSQL</span>

          <span>Redis</span>

          <span>JWT</span>

          <span>Google OAuth</span>

        </div>

        {/* Copyright */}

        <p className="text-sm text-slate-500">
          © 2026 LinkLens.
        </p>

      </div>

    </footer>
  );
}

export default Footer;