import { useState } from "react";
import Button from "../ui/Button";
import GoogleButton from "./GoogleButton";
import {
    FiEye,
    FiEyeOff,
    FiMail,
    FiLock,
    FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function RegisterCard({
    name,
    email,
    password,
    confirmPassword,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmit,
    loading,
}) {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div
            className="
    relative
    w-full
    max-w-[460px]
    rounded-3xl
    border
    border-violet-500/20
    bg-slate-900/80
    px-6
    py-3
    backdrop-blur-xl
    shadow-[0_25px_80px_rgba(124,58,237,.15)]
  "
        >
            {/* Glow */}

            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-violet-400 to-transparent" />

            {/* Heading */}

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
                LINKLENS
            </p>

            <h1 className="mt-0.5 text-[34px] leading-none font-bold text-white">
                Create Account
            </h1>

            <p className="mt-0 text-sm leading-5 text-slate-400">
                Start shortening and tracking your smart links.
            </p>

            {/* Form */}

            <form
                onSubmit={onSubmit}
                className="mt-2 space-y-1"
            >

                {/* Name */}

                <div>

                    <label className="mb-0.5 block text-sm font-medium text-slate-300">
                        Name
                    </label>

                    <div className="relative">

                        <FiUser
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={onNameChange}
                            className="
          h-10
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          pl-14
          pr-4
          text-white
          placeholder:text-slate-500
          outline-none
          transition
          focus:border-violet-500
        "
                        />

                    </div>

                </div>

                {/* Email */}

                <div>

                    <label className="mb-0.5 block text-sm font-medium text-slate-300">
                        Email
                    </label>

                    <div className="relative">

                        <FiMail
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                            size={18}
                        />

                        <input
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={onEmailChange}
                            className="
                h-10
                w-full
                rounded-2xl
                border
                border-slate-700
                bg-slate-900
                pl-14
                pr-4
                text-white
                placeholder:text-slate-500
                outline-none
                transition
                focus:border-violet-500
              "
                        />

                    </div>

                </div>

                {/* Password */}

                <div>

                    <label className="mb-0.5 block text-sm font-medium text-slate-300">
                        Password
                    </label>

                    <div className="relative">

                        <FiLock
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                            size={18}
                        />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={onPasswordChange}
                            className="
        h-10
        w-full
        rounded-2xl
        border
        border-slate-700
        bg-slate-900
        pl-14
        pr-14
        text-white
        placeholder:text-slate-500
        outline-none
        transition
        focus:border-violet-500
    "
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>

                    </div>

                </div>

                <div>

                    <label className="mb-0.5 block text-sm font-medium text-slate-300">
                        Confirm Password
                    </label>

                    <div className="relative">

                        <FiLock
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                            size={18}
                        />

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            required
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                            className="
        h-10
        w-full
        rounded-2xl
        border
        border-slate-700
        bg-slate-900
        pl-14
        pr-14
        text-white
        placeholder:text-slate-500
        outline-none
        transition
        focus:border-violet-500
    "
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-1 h-10 rounded-2xl"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </Button>

                {/* Divider */}

                <div className="flex items-center gap-3 py-0">

                    <div className="h-px flex-1 bg-slate-700" />

                    <span className="text-sm uppercase tracking-[0.25em] text-slate-500">
                        OR
                    </span>

                    <div className="h-px flex-1 bg-slate-700" />

                </div>

                <GoogleButton
                    onClick={() => {
                        const API_URL = import.meta.env.VITE_API_URL.replace("/api", "");

<GoogleButton
  onClick={() => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  }}
/>
                    }}
                />

                <p className="pt-0 text-center text-sm text-slate-400">

                    Already have an account?



                    <Link
                        to="/login"
                        className="ml-2 font-semibold text-violet-400 hover:text-violet-300"
                    >
                        Sign In
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default RegisterCard;