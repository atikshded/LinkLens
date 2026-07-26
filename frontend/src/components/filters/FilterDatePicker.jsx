import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

function FilterDatePicker({ value, onChange }) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      placeholderText="Select date"
      dateFormat="dd MMM yyyy"
      isClearable
      popperPlacement="bottom-start"
      calendarClassName="ll-datepicker"
      wrapperClassName="w-full"
      className="
        h-11
        w-full
        rounded-xl
        border
        border-slate-700
        bg-[#192235]
        px-4
        text-white
        outline-none
        transition
        focus:border-violet-500
      "
    />
  );
}

export default FilterDatePicker;