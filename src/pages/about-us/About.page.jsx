import React from "react";

import "./About.styles.css";
import about_fuss from "../../assets/images/about/about_fuss.jpg";

const AboutPage = () => {
  return (
    <div className="cm-about-page-container">
      <div className="cm-section cm-banner-container cm-prim-bg cm-white-col">
        <div className="cm-page-center cm-lr-pad">
          <h2 className="cm-section-h">About Us</h2>
        </div>
      </div>

      <div className="cm-section cm-about-us-container">
        <div className="cm-page-center cm-flex-type-1">
          <div className="cm-left-col cm-lr-pad">
            <h2 className="cm-section-h">
              Grab On the Best Flight Deals and Embark On Your Journey with
              WeBestFly
            </h2>
            <p className="cm-section-sp">
              WeBestFly is your one-stop platform to explore competitive
              airfares and great discount deals on online flight booking across
              all major destinations in the USA, UK, and Canada. As a thriving
              booking platform, we endeavor to eliminate every challenge that
              comes your way while browsing flight schedules online.
            </p>
            {/* <ul>
              <li>
                <strong>Promising Deals</strong> -
                <span>
                  We strive to make online booking hassle-free for our customers
                  across USA, UK, and Canada.
                </span>
              </li>
              <li>
                <strong>Redefined Experience</strong> -
                <span>
                  Our team at WeBestFly focuses on improving the travel
                  experience with impeccable flight deals.
                </span>
              </li>
              <li>
                <strong>All-Embracing Offerings</strong> -
                <span>
                  Our team at WeBestFly focuses on improving the travel
                  experience with impeccable flight deals.
                </span>
              </li>
              <li>
                <strong>Ceaseless Support</strong> -
                <span>
                  Need assistance while booking budget-friendly flights online?
                  Our support team is here to help!
                </span>
              </li>
            </ul> */}
          </div>
          <div className="cm-right-col cm-lr-pad">
            <i className="fa-solid fa-plane-circle-check cm-flex-type-2 cm-prim-bg cm-white-col"></i>
          </div>
        </div>
      </div>

      <div className="cm-section cm-home-feat-container">
        <div className="cm-page-center">
          <h2 className="cm-section-h">Why WeBestFly?</h2>
          <div className="cm-home-feat-wrapper cm-section-spacing cm-flex-type-2 cm-flex-wrap cm-flex-align-in">
            <div className="cm-home-feat-item">
              <div className="cm-feat-header cm-flex">
                <i className="fa-solid fa-tag"></i>
                <p>Promising Deals</p>
              </div>
              <p>
                We strive to make online booking hassle-free for our customers
                across USA, UK, and Canada.
              </p>
            </div>

            <div className="cm-home-feat-item">
              <div className="cm-feat-header cm-flex">
                <i className="fa-solid fa-circle-check"></i>
                <p>Redefined Experience</p>
              </div>
              <p>
                Our team at WeBestFly focuses on improving the travel experience
                with impeccable flight deals.
              </p>
            </div>
            <div className="cm-home-feat-item">
              <div className="cm-feat-header cm-flex">
                <i className="fa-solid fa-heart"></i>
                <p>All-Embracing Offerings</p>
              </div>
              <p>
                Our team at WeBestFly focuses on improving the travel experience
                with impeccable flight deals.
              </p>
            </div>
            <div className="cm-home-feat-item">
              <div className="cm-feat-header cm-flex">
                <i className="fa-solid fa-clock"></i>
                <p>Ceaseless Support</p>
              </div>
              <p>
                Need assistance while booking budget-friendly flights online?
                Our support team is here to help!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="cm-section cm-about-fuss-container">
        <div className="cm-page-center cm-flex-type-1">
          <div className="cm-left-col cm-lr-pad">
            <img
              src={about_fuss}
              alt="Fuss-Free Flight Booking"
              className="box-shadow-2"
            />
          </div>
          <div className="cm-right-col cm-lr-pad">
            <h2 className="cm-section-h">
              Fuss-Free Flight Booking to Have Something to Look Back On
            </h2>
            <p>
              Be it an important business meeting, a family occasion, or a
              much-needed break from work; travel is an immovable aspect of our
              lives. As a well-established travel service provider, we are
              familiar with the recurring challenges people face while planning
              their trips.
            </p>
            <p>
              Providing great deals and discounts on flight tickets is our way
              to alleviate your online flight booking experience. We believe
              that cost-efficient travel planning is the first step to a trip
              you would want to reminisce about later in your life. Therefore we
              make sure that you get to find the best flights in your budget and
              your preferred timeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
