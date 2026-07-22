import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500",
    secondary:
      "border border-slate-700 bg-transparent text-white hover:bg-slate-800",
    ghost:
      "bg-transparent text-slate-300 hover:bg-slate-800",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        h-12
        w-full
        rounded-xl
        font-semibold
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;