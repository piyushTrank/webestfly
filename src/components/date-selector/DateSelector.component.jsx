import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({
  selectedDate,
  minDate,
  handleDateChange,
  fieldName,
  isDisabled,
}) => {
  const [startDate, setStartDate] = React.useState(selectedDate);

  const handleDateSelect = (selDate) => {
    console.log("handleDateSelect", selDate);
    handleDateChange(selDate, fieldName);
  };

  return (
    <div
      className={`cm-date-selector cm-pos-relative ${
        isDisabled ? "cm-datepicker-disabled" : ""
      }`}
    >
      <i className="fa-solid fa-calendar cm-sec-col"></i>
      <DatePicker
        selected={startDate}
        onSelect={handleDateSelect}
        {...(!!minDate ? (minDate = { minDate }) : "")}
        onChange={(date) => setStartDate(date)}
        placeholderText="MM/DD/YYYY"
        disabled={isDisabled}
      />
    </div>
  );
};

export default DateSelector;
