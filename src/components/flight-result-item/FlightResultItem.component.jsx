import React from "react";
import SlideToggle from "react-slide-toggle";
import moment from "moment";
import { getDuration } from "../../utils/utilFn";

import "./FlightResultItem.styles.css";

const FlightResultItem = ({
  flData,
  airlineName,
  airportNames,
  allAirlineNames,
  navigate,
}) => {
  const [activeTab, setActiveTab] = React.useState(1);

  const handleTabSwitch = (tabNum) => setActiveTab(tabNum);

  const getAirportNames = (iataCode) => {
    if (!!airportNames)
      return !!airportNames[iataCode]
        ? `${airportNames[iataCode].code} | ${airportNames[iataCode].name}, ${airportNames[iataCode].country}`
        : iataCode;
  };

  const getAirlineName = (code) => allAirlineNames[code];

  const loadTopItinerarySum = () => {
    return flData.itineraries.map((el, index) => {
      const firstSegment = el.segments[0];
      const lastSegment = el.segments[el.segments.length - 1];

      return (
        <div
          key={flData.id + "-" + index}
          className="cm-fl-res-item-it-sum-item cm-flex-type-1"
        >
          <div className="cm-col cm-col1">
            <p>
              <i className="fa-solid fa-location-dot"></i>{" "}
              <span>
                <span className="cm-airport-name">
                  {firstSegment.departure.iataCode}
                </span>
                <i className="fa-solid fa-clock"></i>{" "}
                {moment(firstSegment.departure.at).format("h:mm a")}
              </span>
            </p>
            <p>
              <i className="fa-solid fa-calendar"></i>{" "}
              <span>
                {moment(firstSegment.departure.at).format("ddd, DD MMM")}
              </span>
            </p>
          </div>
          <div className="cm-col cm-col2 cm-pos-relative">
            <p className="cm-fl-path cm-pos-relative">
              <i className="fa-solid fa-location-dot cm-sec-col"></i>
              <i className="fa-solid fa-plane cm-sec-col2"></i>
              <i className="fa-solid fa-location-dot cm-sec-col"></i>
            </p>
            <span>
              {el.segments.length > 1
                ? `${el.segments.length - 1} Stop(s) `
                : ""}
              {getDuration(el.duration)}
            </span>
          </div>
          <div className="cm-col cm-col3">
            <p>
              <i className="fa-solid fa-location-dot"></i>{" "}
              <span>
                <span className="cm-airport-name">
                  {lastSegment.arrival.iataCode}
                </span>
                <i className="fa-solid fa-clock"></i>{" "}
                {moment(lastSegment.arrival.at).format("h:mm a")}
              </span>
            </p>
            <p>
              <i className="fa-solid fa-calendar"></i>{" "}
              <span>
                {moment(lastSegment.arrival.at).format("ddd, DD MMM")}
              </span>
            </p>
          </div>
        </div>
      );
    });
  };

  const loadFullItinerary = () => {
    return flData.itineraries.map((el, index) => {
      return (
        <div key={index} className="cm-iti-item">
          <h2>
            <i className="fa-solid fa-plane-departure"></i>{" "}
            {index === 0 ? "Departure" : "Return"}-{" "}
            {getAirportNames(el.segments[0].departure.iataCode)}
          </h2>
          {loadSegments(el.segments)}
        </div>
      );
    });
  };

  const loadSegments = (segmentArr) => {
    return segmentArr.map((el) => (
      <div key={el.id} className="cm-content cm-flex-type-1">
        <div className="cm-col cm-col1">
          <h4>{getAirlineName(el.carrierCode)}</h4>
          <p className="cm-fl-code">
            {el.carrierCode} - {el.number}
          </p>
        </div>
        <div className="cm-col cm-col2">
          <h4 className="cm-sec-col2">{el.departure.iataCode}</h4>
          <p>
            {getAirportNames(el.departure.iataCode)} Terminal:{" "}
            {el.departure.terminal}
          </p>
          <p className="cm-fl-date">
            {moment(el.departure.at).format("DD MMM, hh:mm a, dddd")}
          </p>
        </div>
        <div className="cm-col cm-col3">
          <h4 className="cm-sec-col2">{el.arrival.iataCode}</h4>
          <p>
            {getAirportNames(el.arrival.iataCode)} Terminal:{" "}
            {el.arrival.terminal}
          </p>
          <p className="cm-fl-date">
            {moment(el.arrival.at).format("DD MMM, hh:mm a, dddd")}
          </p>
        </div>
        <div className="cm-col cm-col4">
          <h4 className="cm-sec-col2">Duration</h4>
          <p className="cm-fl-date">{getDuration(el.duration)}</p>
        </div>
      </div>
    ));
  };

  const loadFares = () => {
    return (
      <table
        className="table table-bordered"
        border="1"
        cellPadding="0"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Passenger</th>
            <th>
              Base (<span currency="code">USD</span>)
            </th>
            <th>
              Total (<span currency="code">USD</span>)
            </th>
          </tr>
        </thead>
        <tbody>
          {flData.travelerPricings.map((el) => (
            <tr key={el.travelerId}>
              <td>{el.travelerId}</td>
              <td>{el.travelerType}</td>
              <td currency="value" fare="921.00">
                {el.price.base}
              </td>
              <td currency="value" fare="1552.50">
                {el.price.total}
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <th>
              Grand Total (<span currency="code">USD</span>)
            </th>
            <td currency="value" fare={flData.price.grandTotal}>
              {flData.price.grandTotal}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const handleBookNow = () => {
    navigate("/booking", {
      state: {
        flData,
        airlineName,
        airportNames,
        allAirlineNames,
      },
    });
  };

  return (
    <div className="cm-fl-res-item">
      <div className="cm-fl-res-item-header cm-flex-type-1">
        <div className="cm-col cm-col1">
          <h4>{airlineName}</h4>
          {/* <p>Flight (142)</p> */}
        </div>
        <div className="cm-col cm-col2">
          <h3>$ {flData.price.base}</h3>
          <p>Total Base Fare</p>
        </div>
        <div className="cm-col cm-col3">
          <span
            onClick={handleBookNow}
            className="cm-btn cm-sec-bg2 cm-white-col cm-uppercase"
          >
            <i className="fa-solid fa-plane-engines"></i> Book Now
          </span>
          <p>
            only <span>{flData.numberOfBookableSeats} seats</span> left at this
            price.
          </p>
        </div>
      </div>
      <div className="cm-fl-res-item-it-sum-wrap">
        {/* <div className="cm-fl-res-item-it-sum-item cm-flex-type-1">
          <div className="cm-col cm-col1">
            <p>
              <i className="fa-solid fa-location-dot"></i>{" "}
              <span>
                <span className="cm-airport-name">DEL</span>
                <i className="fa-solid fa-clock"></i> 12:30
              </span>
            </p>
            <p>
              <i className="fa-solid fa-calendar"></i> <span>Fri, 27 May</span>
            </p>
          </div>
          <div className="cm-col cm-col2 cm-pos-relative">
            <p className="cm-fl-path cm-pos-relative">
              <i className="fa-solid fa-location-dot cm-sec-col"></i>
              <i className="fa-solid fa-plane cm-sec-col2"></i>
              <i className="fa-solid fa-location-dot cm-sec-col"></i>
            </p>
            <span>20H 10M</span>
          </div>
          <div className="cm-col cm-col3">
            <p>
              <i className="fa-solid fa-location-dot"></i>{" "}
              <span>
                <span className="cm-airport-name">DEL</span>
                <i className="fa-solid fa-clock"></i> 12:30
              </span>
            </p>
            <p>
              <i className="fa-solid fa-calendar"></i> <span>Fri, 27 May</span>
            </p>
          </div>
        </div> */}
        {loadTopItinerarySum()}
      </div>

      <SlideToggle
        collapsed={true}
        duration={800}
        render={({ toggle, setCollapsibleElement, progress }) => (
          <div
            className={`cm-fl-res-accord ${
              progress !== 0 ? "cm-acc-active" : ""
            }`}
          >
            <p
              onClick={toggle}
              className="cm-acc-toggler cm-pointer cm-txt-center"
            >
              {progress === 0 ? "Show" : "Hide"} Details{" "}
              <i
                className={`fa-solid ${
                  progress === 0 ? "fa-angle-down" : "fa-angle-up"
                }`}
              ></i>
            </p>
            <div className="cm-fl-res-accord" ref={setCollapsibleElement}>
              <ul className="cm-fl-accord-tab cm-flex-type-2 cm-txt-center cm-menu-ul">
                <li
                  onClick={() => handleTabSwitch(1)}
                  className={`${
                    activeTab === 1 ? "active-tab" : ""
                  } cm-pointer`}
                >
                  Itinerary
                </li>
                <li
                  onClick={() => handleTabSwitch(2)}
                  className={`${
                    activeTab === 2 ? "active-tab" : ""
                  } cm-pointer`}
                >
                  Fares
                </li>
              </ul>
              {activeTab === 1 ? (
                <div className="cm-fl-res-iti-tab">{loadFullItinerary()}</div>
              ) : (
                <div className="cm-fl-res-fares-tab">{loadFares()}</div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default FlightResultItem;
