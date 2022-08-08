import React from "react";
import Lottie from "react-lottie";
import moment from "moment";
import animationData from "../../assets/data/loader.json";

import "./FlLoader.styles.css";

export default function FlLoader({ data }) {
  console.log("data", data);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="cm-section cm-fl-loader-container">
      <div className="cm-page-center cm-txt-center">
        <div className="cm-fl-loader-wrapper box-shadow-2">
          <h3 className="cm-section-sh">
            <i className="fa-solid fa-plane-departure"></i> From{" "}
            {data.locationDeparture} to {data.locationArrival}
          </h3>
          <p>
            <i className="fa-solid fa-clock"></i>{" "}
            {moment(data.departure).format("DD MMMM, YYYY")}{" "}
            {data.tripType === "round-trip"
              ? `- 
            ${moment(data.arrival).format("DD MMMM, YYYY")}`
              : ""}
          </p>
          <Lottie options={defaultOptions} height={200} width={200} />
          <h4>Fetching best deals for you....</h4>
        </div>
      </div>
    </div>
  );
}
