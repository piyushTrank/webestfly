import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import { phoneNum } from "../../utils/globalVars";
import FlightBookForm from "../../components/flight-book-form/FlightBookForm.component";
import { getDuration } from "../../utils/utilFn";

const BookTicketsContainer = ({ data }) => {
  // const phoneNum = useSelector((state) => state.misc.contact);

  const getAirportNames = (iataCode) => {
    if (!!data.airportNames)
      return `${data.airportNames[iataCode].code} | ${data.airportNames[iataCode].name}, ${data.airportNames[iataCode].country}`;
  };

  const getAirlineName = (code) => data.allAirlineNames[code];

  const loadFullItinerary = (arr) => {
    return arr.map((el, index) => {
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

  return (
    <div className="cm-book-ticket-container cm-section">
      <div className="cm-page-center cm-flex-type-1 cm-flex-align-fs">
        <div className="cm-left-col cm-lr-pad">
          <div className="cm-fl-res-iti-tab">
            {loadFullItinerary(data.flData.itineraries)}
          </div>
          <FlightBookForm
            travData={data.flData.travelerPricings}
            grandTotal={data.flData.price.grandTotal}
          />
        </div>
        <div className="cm-right-col cm-lr-pad">
          <div className="cm-booking-cta cm-txt-center">
            <h4>Need Help?</h4>
            <div className="cm-content">
              <p>
                Our travel experts are just a call away! Get in touch now to
                customize your vacation hassle-free and enjoy your time away!
              </p>
              <h5>Call Us</h5>
              {!!phoneNum ? (
                <a className="cm-sec-col2" href={`tel: ${phoneNum.value}`}>
                  {phoneNum.label}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTicketsContainer;
