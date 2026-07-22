function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  disabled = false,
  autoComplete = "off",
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-4
          text-sm
          text-white
          placeholder:text-slate-500
          transition-all
          duration-200
          outline-none
          focus:border-violet-500
          focus:ring-2
          focus:ring-violet-500/20
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}

export default Input;