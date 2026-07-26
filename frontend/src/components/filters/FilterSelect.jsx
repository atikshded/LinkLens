import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#192235",
    borderColor: state.isFocused ? "#7c3aed" : "#334155",
    borderRadius: "12px",
    minHeight: "44px",
    boxShadow: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      borderColor: "#7c3aed",
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: "0 12px",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),

  input: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#94a3b8",
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#192235",
    border: "1px solid #334155",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
    zIndex: 9999,
  }),

  menuList: (provided) => ({
    ...provided,
    paddingTop: 6,
    paddingBottom: 6,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#7c3aed"
      : state.isFocused
      ? "#312e81"
      : "#192235",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.15s ease",
    padding: "10px 14px",
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#a78bfa" : "#94a3b8",
    transition: "color 0.2s ease",

    "&:hover": {
      color: "#a78bfa",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function FilterSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
}) {
  const selected =
    options.find((option) => option.value === value) || null;

  return (
    <Select
  styles={customStyles}
  value={selected}
  options={options}
  placeholder={placeholder}
  isSearchable={false}
  onChange={(option) => onChange(option?.value)}
  menuPlacement="auto"
  menuPosition="fixed"
/>
  );
}

export default FilterSelect;