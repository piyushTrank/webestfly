import React from "react";

const CarriersFilter = ({ data, selected, handleCarrierChange }) => {
  const handleInpChange = (e) => {
    handleCarrierChange(e.target.value);
  };

  const loadCarriers = () => {
    const carrierArr = [];
    for (let key in data) {
      carrierArr.push(
        <li key={key}>
          <label htmlFor={key}>
            <input
              onChange={handleInpChange}
              type="checkbox"
              name="stops"
              value={key}
              id={key}
              checked={selected.includes(key)}
            />
            <span>{data[key]}</span>
          </label>
        </li>
      );
    }

    return carrierArr;
  };

  return (
    <div className="cm-filter-widget cm-carrier-filter">
      <h4>Airlines</h4>
      <ul className="cm-menu-ul">{loadCarriers()}</ul>
    </div>
  );
};

export default CarriersFilter;
