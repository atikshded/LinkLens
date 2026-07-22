import { FcGoogle } from "react-icons/fc";

function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        h-10
        flex
        items-center
        justify-center
        gap-3
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        text-white
        text-sm
        font-medium
        transition-all
        duration-200
        hover:bg-slate-800
        hover:border-slate-600
        active:scale-[0.98]
      "
    >
      <FcGoogle size={20} />

      <span>Continue with Google</span>
    </button>
  );
}

export default GoogleButton;