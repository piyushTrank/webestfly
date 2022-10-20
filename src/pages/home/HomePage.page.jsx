import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import FlightSearchForm from "../../components/flight-search-form/FlightSearchForm.component";
import moment from "moment";

import "./Homepage.styles.css";

import airline1 from "../../assets/images/flight/pngwing.com (67).jpg";
import airline2 from "../../assets/images/flight/pngwing.com (71).jpg";
import airline3 from "../../assets/images/flight/pngwing.com (68).jpg";
import airline4 from "../../assets/images/flight/pngwing.com (70).jpg";
import airline5 from "../../assets/images/flight/pngwing.com (63).jpg";
import airline6 from "../../assets/images/flight/air_canda.png";
import airline7 from "../../assets/images/flight/spirit.png";
import airline8 from "../../assets/images/flight/british_airways.png";

import london from "../../assets/images/flight/london.jpg";
import toronto from "../../assets/images/flight/toronto.jpg";
import niagra from "../../assets/images/flight/niagra.jpg";
import sol from "../../assets/images/flight/sol.jpg";
import uk from "../../assets/images/flight/uk.jpg";
import atlanta from "../../assets/images/flight/atlanta.jpg";
import new_york from "../../assets/images/flight/new york.jpg";
import { useNavigate } from "react-router-dom";
import girlImg from "../../assets/images/flight/girlImg.png";
import { phoneNum } from "../../utils/globalVars";
import discount from "../../assets/images/flight/discount.png";
import umbrella from "../../assets/images/flight/umbrella.png";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  // const phoneNum = useSelector((state) => state.misc.contact);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExpClick = (origin, dest) => {
    navigate({
      pathname: "/flights",
      search: `?search_t=${moment().unix()}&tripType=one-way&dep_loc=${origin}&dest_loc=${dest}&dep_dt=${moment().format(
        "YYYY-MM-DD"
      )}&ret_dt=null&fl_cl=ECONOMY&adt=1&chd=0`,
    });
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="cm-homepage-container">
      <div className="cm-homepage-banner-container cm-bg-prop cm-pos-relative">
        <div className="cm-page-center cm-txt-center">
          <h1 className="cm-white-col cm-prim-bg cm-white-col">
            Plan your travel at the lowest air fare
          </h1>
          {/* <p className="cm-white-col cm-txt-center">
            Easily compare and book your next flight
          </p> */}
          <FlightSearchForm />

          <div className="cm-section cm-banner-save-deal-container">
            <div className="cm-page-center cm-lr-pad">
              <div className="cm-banner-save-deal-wrapper cm-white-bg">
                <div className="cm-top-head cm-flex-type-1 cm-lr-pad">
                  <p className="cm-flex-type-2">
                    <img src={discount} alt="Discount" /> Limited-time Offer
                  </p>
                  <h5 className="cm-lr-pad">
                    SAVE EXTRA $30* BY CALLING NOW:{" "}
                    {!!phoneNum ? (
                      <a
                        href={`tel:${phoneNum.value}`}
                        className="cm-prim-bg cm-white-col"
                      >
                        {phoneNum.label}
                      </a>
                    ) : null}
                  </h5>
                </div>
                <div className="cm-middle-info cm-flex-type-2 cm-flex-align-in cm-flex-wrap">
                  <div className="cm-deal-item">
                    <p>New York (JFK) to Toronto (YYZ)</p>
                    <p className="cm-sec-col2">Super Saver Fare</p>
                    <h3 className="cm-prim-col">
                      $ 388
                      <sup>
                        .00<sup>*</sup>
                      </sup>
                    </h3>
                    <span>Round-Trip</span>
                  </div>
                  <div className="cm-deal-item">
                    <p>New York (JFK) to Los Angeles (LAX)</p>
                    <p className="cm-sec-col2">Super Saver Fare</p>
                    <h3 className="cm-prim-col">
                      $ 448
                      <sup>
                        .37<sup>*</sup>
                      </sup>
                    </h3>
                    <span>Round-Trip</span>
                  </div>
                  <div className="cm-deal-item">
                    <p>San Francisco (SFO) to Boston (BOS)</p>
                    <p className="cm-sec-col2">Super Saver Fare</p>
                    <h3 className="cm-prim-col">
                      $ 664
                      <sup>
                        .19<sup>*</sup>
                      </sup>
                    </h3>
                    <span>Round-Trip</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cm-home-guidelines-container cm-section">
        <div className="cm-page-center cm-flex-type-2 cm-flex-wrap">
          <div className="cm-left-col cm-lr-pad cm-flex-type-1 cm-white-col box-shadow-2 cm-pos-relative">
            <div className="cm-phone-img cm-flex-type-2">
              <i className="fa fa-phone"></i>
            </div>
            <div className="cm-content">
              <p>Call Only Offer: Save up to $30 on Unpublished Deals: </p>
              {!!phoneNum ? (
                <a
                  href={`tel:${phoneNum.value}`}
                  className="cm-sec-bg cm-white-col"
                >
                  {phoneNum.label}
                </a>
              ) : null}
            </div>
            <img src={girlImg} alt="Girl" className="cm-girl-img" />
          </div>
          <div className="cm-right-col">
            <Slider {...settings} className="cm-home-guide-slider box-shadow-2">
              <div className="cm-home-guide-slide">
                <p>
                  Web Check-in Mandatory, Follow all guidelines before reaching
                  Airport.
                </p>
              </div>
              <div className="cm-home-guide-slide">
                <p>
                  Travel Checklist - Negative RT-PCR Certificates, Mandatory
                  Health Declaration & Mandatory Protective Gear.
                </p>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div className="cm-section cm-home-trav-container">
        <div className="cm-page-center cm-flex-type-2">
          <div className="cm-left-col cm-wd-50 cm-lr-pad">
            <h2 className="cm-section-h">Travel that moves you</h2>
            <p className="cm-section-sp">
              More than 10 trusted travel partners accross flights and airport
              transfers, so that you can focus on the journey.
            </p>
            <p>
              <span className="cm-btn cm-sec-bg2 cm-wt-600 cm-white-col">
                Book Now
              </span>
            </p>
          </div>
          <div className="cm-right-col cm-wd-50 cm-flex-type-2 cm-flex-wrap cm-txt-center cm-lr-pad">
            {/* <div className="cm-trav-img-item cm-wd-33">
              <img src={airline1} alt="Delta" />
            </div>
            <div className="cm-trav-img-item cm-wd-33">
              <img src={airline2} alt="American Airlines" />
            </div> */}
            <div className="cm-trav-img-item cm-wd-33">
              <img src={airline3} alt="Alaska Airlines" />
            </div>
            <div className="cm-trav-img-item cm-wd-50">
              <img src={airline4} alt="United Airlines" />
            </div>
            <div className="cm-trav-img-item cm-wd-50 cm-txt-center">
              <img src={airline5} alt="Lufthansa" />
            </div>
            <div className="cm-trav-img-item cm-wd-33 cm-lr-pad">
              <img src={airline7} alt="Spirit Arilines" />
            </div>
            <div className="cm-trav-img-item cm-wd-33">
              <img src={airline6} alt="Air Canada" />
            </div>
            <div className="cm-trav-img-item cm-wd-33">
              <img src={airline8} alt="British Airways" />
            </div>
          </div>
        </div>
      </div>

      <div className="cm-section cm-home-feat-container">
        <div className="cm-page-center cm-flex-type-2">
          <div className="cm-home-feat-item">
            <div className="cm-feat-header cm-flex">
              <i className="fa-solid fa-tag"></i>
              <p>Lowest Prices</p>
            </div>
            <p>
              We partner with the top flight carriers to bring you the best
              deals.
            </p>
          </div>

          <div className="cm-home-feat-item">
            <div className="cm-feat-header cm-flex">
              <i className="fa-solid fa-circle-check"></i>
              <p>No Hidden Fees</p>
            </div>
            <p>Without any extra fees, we make it easy to book your tickets</p>
          </div>
          <div className="cm-home-feat-item">
            <div className="cm-feat-header cm-flex">
              <i className="fa-solid fa-heart"></i>
              <p>Best Flights Options</p>
            </div>
            <p>We help you find & compare the best flights in one place.</p>
          </div>
          <div className="cm-home-feat-item">
            <div className="cm-feat-header cm-flex">
              <i className="fa-solid fa-clock"></i>
              <p>Instant Booking</p>
            </div>
            <p>For selected sellers, book with just a couple of clicks.</p>
          </div>
        </div>
      </div>

      <div className="cm-section cm-exp-container">
        <div className="cm-page-center">
          <h2 className="cm-section- cm-txt-center">
            Explore Best Destinations
          </h2>
          <div className="cm-section-spacing cm-exp-wrapper cm-flex-type-2 cm-flex-wrap">
            <div className="cm-exp-item box-shadow-2">
              <div
                className="cm-exp-bg cm-bg-prop"
                style={{ backgroundImage: `url('${london}')` }}
              ></div>
              <div className="cm-content cm-sec-bg cm-white-col cm-txt-center">
                <h4>Explore London</h4>
              </div>
              <div className="cm-origin-wrap">
                <div className="cm-origin-header">
                  <span>Origin</span>
                  <span>Starting From</span>
                </div>
                <ul className="cm-menu-ul cm-origin-content">
                  <li
                    onClick={(e) => handleExpClick("JFK", "LHR")}
                    className="cm-pointer"
                  >
                    <span>New York</span>
                    <span>$ 432.00</span>
                  </li>
                  <li
                    onClick={(e) => handleExpClick("ATL", "LHR")}
                    className="cm-pointer"
                  >
                    <span>Atlanta</span>
                    <span>$ 432.00</span>
                  </li>
                  <li
                    onClick={(e) => handleExpClick("BER", "LHR")}
                    className="cm-pointer"
                  >
                    <span>Berlin</span>
                    <span>$ 105.00</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="cm-exp-item box-shadow-2">
              <div
                className="cm-exp-bg cm-bg-prop"
                style={{ backgroundImage: `url('${new_york}')` }}
              ></div>
              <div className="cm-content cm-sec-bg cm-white-col cm-txt-center">
                <h4>Explore New York</h4>
              </div>
              <div className="cm-origin-wrap">
                <div className="cm-origin-header">
                  <span>Origin</span>
                  <span>Starting From</span>
                </div>
                <ul className="cm-menu-ul cm-origin-content">
                  <li
                    onClick={(e) => handleExpClick("DEL", "JFK")}
                    className="cm-pointer"
                  >
                    <span>New Delhi</span>
                    <span>$ 285.00</span>
                  </li>
                  <li
                    onClick={(e) => handleExpClick("MUC", "JFK")}
                    className="cm-pointer"
                  >
                    <span>Munich</span>
                    <span>$ 124.00</span>
                  </li>
                  <li
                    onClick={(e) => handleExpClick("LHR", "JFK")}
                    className="cm-pointer"
                  >
                    <span>London</span>
                    <span>$ 288.00</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="cm-exp-item box-shadow-2">
              <div
                className="cm-exp-bg cm-bg-prop"
                style={{ backgroundImage: `url('${atlanta}')` }}
              ></div>
              <div className="cm-content cm-sec-bg cm-white-col cm-txt-center">
                <h4>Explore Atlanta</h4>
              </div>
              <div className="cm-origin-wrap">
                <div className="cm-origin-header">
                  <span>Origin</span>
                  <span>Starting From</span>
                </div>
                <ul className="cm-menu-ul cm-origin-content">
                  <li
                    onClick={(e) => handleExpClick("MUC", "ATL")}
                    className="cm-pointer"
                  >
                    <span>Munich</span>
                    <span>$ 264.00</span>
                  </li>
                  <li
                    onClick={(e) => handleExpClick("LHR", "ATL")}
                    className="cm-pointer"
                  >
                    <span>London</span>
                    <span>$ 275.00</span>
                  </li>
                  <li
                    onClick={(e) => handleExpClick("BER", "ATL")}
                    className="cm-pointer"
                  >
                    <span>Ber</span>
                    <span>$ 285.00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
