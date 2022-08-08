import React from "react";
import moment from "moment";

import CtaType1 from "../../components/cta/CtaType1.component";
import CtaPopup from "../../components/cta-popup/CtaPopup.component";
import FlightResultItem from "../../components/flight-result-item/FlightResultItem.component";
import CarriersFilter from "../../components/carriers-filter/CarriersFilter.component";
import StopsFilter from "../../components/stops-filter/StopsFilter.component";
import { useNavigate } from "react-router-dom";

const FlightResultContainer = ({ dataToSend, flData, travObj }) => {
  console.log("flData", flData);
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState({
    stops: dataToSend.filters.stopsFilter,
    carriers: !!dataToSend.filters.carrierFilter
      ? dataToSend.filters.carrierFilter.split(",")
      : [],
  });

  const loadflights = () => {
    return flData.data.data.map((el) => {
      const airlineName =
        flData.data.dictionaries.carriers[el.validatingAirlineCodes[0]];

      return (
        <FlightResultItem
          flData={el}
          key={el.id}
          airlineName={airlineName}
          airportNames={flData.data.airportNames}
          allAirlineNames={flData.data.dictionaries.carriers}
          navigate={navigate}
        />
      );
    });
  };

  const handleStopChange = (val) => {
    handleFilters({
      ...filters,
      stops: filters.stops !== val ? val : null,
    });

    setFilters({
      ...filters,
      stops: filters.stops !== val ? val : null,
    });
  };

  const handleCarrierChange = (val) => {
    const isPresent = filters.carriers.includes(val);
    let newCarrArr = [];
    if (isPresent) {
      newCarrArr = filters.carriers.filter((el) => el !== val);
    } else {
      newCarrArr = [...filters.carriers, val];
    }

    handleFilters({
      ...filters,
      carriers: newCarrArr,
    });

    setFilters({
      ...filters,
      carriers: newCarrArr,
    });
  };

  const handleFilters = (filters) => {
    const filterString = `${
      !!filters.stops ? `&stopsFil=${filters.stops}` : ""
    }${
      filters.carriers.length > 0 ? `&carFil=${filters.carriers.join()}` : ""
    }`;

    navigate({
      pathname: "/flights",
      search: `?search_t=${moment().unix()}&tripType=${
        dataToSend.tripType
      }&dep_loc=${dataToSend.locationDeparture}&dest_loc=${
        dataToSend.locationArrival
      }&dep_dt=${dataToSend.departure}&ret_dt=${dataToSend.arrival}&fl_cl=${
        dataToSend.flightClass
      }&adt=${travObj.adults}&chd=${travObj.child}${filterString}`,
    });

    console.log("filterString", filterString);
  };

  return (
    <div className="cm-flight-result-container">
      {flData.data.data.length > 0 ? (
        <>
          <CtaType1 fareToShow={flData.data.data[0].price.base} />

          <div className="cm-section cm-flight-result-wrapper">
            <div className="cm-page-center cm-flex">
              <div className="cm-filter-sidebar cm-lr-pad">
                <StopsFilter
                  selected={filters.stops}
                  handleStopChange={handleStopChange}
                />
                <CarriersFilter
                  selected={filters.carriers}
                  handleCarrierChange={handleCarrierChange}
                  data={flData.data.dictionaries.carriers}
                />
              </div>
              <div className="cm-result-wrap cm-lr-pad">{loadflights()}</div>
            </div>
          </div>
          <CtaPopup dataToSend={dataToSend} />
        </>
      ) : (
        <div className="cm-empty-fl-container cm-section cm-txt-center">
          <p className="cm-empty-msg">No flights available.</p>
          <button
            className="cm-btn cm-sec-bg2 cm-white-col"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightResultContainer;
