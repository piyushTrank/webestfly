import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/flight/trian_fly_logo.png";
import { phoneNum } from "../../utils/globalVars";

import "./Footer.styles.css";

const Footer = () => {
  return (
    <footer className="cm-footer-container">
      <div className="cm-fixed-footer-cta cm-txt-center cm-white-bg box-shadow-2 cm-wt-600 cm-prim-bg cm-white-col">
        <p>
          Save Instantly on Unpublished Deals - CALL NOW{" "}
          <a href={`tel:${phoneNum.value}`} className="cm-gray-bg cm-sec-col">
            <i className="fa-solid fa-phone"></i>
            {phoneNum.label}
          </a>
        </p>
      </div>
      <div className="cm-footer-top">
        <div className="cm-page-center cm-flex-type-2 cm-flex-align-fs">
          <div className="cm-footer-col cm-wd-50 cm-lr-pad cm-footer-col1">
            <img className="cm-footer-logo" src={logo} alt="WeBestFly" />
            <p>
              WeBestFly is established to streamline the online flight booking
              experience and touch base with our customers' requirements. You
              can find great deals on flight tickets and plan a budget-efficient
              trip with our one-stop flight booking platform. Customer
              satisfaction is the center of our goals, and we ensure to align
              with your travel needs.
            </p>
          </div>
          <div className="cm-footer-col cm-wd-25 cm-lr-pad cm-footer-col2">
            <h3>Explore Top Destinations</h3>
            <ul className="cm-menu-ul">
              <li>
                <Link to="/packages">Explore London</Link>
              </li>
              <li>
                <Link to="/packages">Explore New York</Link>
              </li>
              <li>
                <Link to="/packages">Explore Atlanta</Link>
              </li>
            </ul>
          </div>
          <div className="cm-footer-col cm-wd-25 cm-lr-pad cm-footer-col3">
            <h3>Reach us at</h3>
            <ul className="cm-menu-ul">
              <li>
                <a href={`tel:${phoneNum.value}`}>
                  <i className="fa-solid fa-phone"></i>
                  <span>{phoneNum.label}</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@webestfly.com">
                  <i className="fa-solid fa-envelope"></i>
                  <span>contact@webestfly.com</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-location-dot"></i>
                  <address>
                    300 Spectrum Center Drive #400, Irvine, CA 92618{" "}
                  </address>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cm-footer-bottom cm-sec-bg cm-white-col">
        <div className="cm-page-center cm-txt-center">
          <p>© 2022. All rights reserved.</p>
          <p className="cm-flex-type-2">
            <Link to="/privacy-policy">Privacy Policy</Link> |
            <Link to="/terms-and-conditions">Terms & Conditions</Link> |
            <Link to="/disclaimer">Disclaimer</Link> |
            <Link to="/refund-policy">Refund Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
