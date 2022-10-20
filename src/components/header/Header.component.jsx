import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Header.styles.css";
import logo from "../../assets/images/flight/trian_fly_logo.png";
import support from "../../assets/images/flight/support (1).png";
import direction from "../../assets/images/flight/direction.png";
import { phoneNum } from "../../utils/globalVars";

const Header = () => {
  // const phoneNum = useSelector((state) => state.misc.contact);
  const [menuStatus, setMenuStatus] = React.useState(false);

  const handleMenu = () => {
    setMenuStatus(!menuStatus);
  };

  return (
    <header
      className={`cm-header-container cm-white-bg box-shadow-1 ${
        menuStatus ? "cm-menu-active" : ""
      }`}
    >
      <div className="cm-page-center cm-flex-type-1">
        <div className="cm-header-logo">
          <Link to="/">
            <img src={logo} alt="WeBestFly" />
          </Link>
        </div>
        <div className="cm-header-op cm-flex-type-1">
          {/* <div className="cm-primary-menu">
            <ul className="cm-menu-ul cm-flex">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Flights</Link>
              </li> 
            </ul>
          </div> */}

          <div className="cm-sec-menu">
            <div className="cm-menu-trigger cm-pointer" onClick={handleMenu}>
              {menuStatus ? (
                <i className="fa-solid fa-xmark"></i>
              ) : (
                <i className="fa-solid fa-bars"></i>
              )}
            </div>
            <ul className="cm-menu-ul cm-flex-type-1" onClick={handleMenu}>
              {/* <li className="cm-flex-type-2">
                <img src={direction} alt="Explore" />
                <span>Explore</span>
              </li> */}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/packages">Packages</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li className="cm-flex-type-2 cm-support-menu">
                <img src={support} alt="Support" />
                <span>
                  <a href={`tel:${!!phoneNum ? phoneNum.label : ""}`}>
                    Support
                  </a>
                </span>
              </li>
              {!!phoneNum ? (
                <li className="cm-flex-type-2 cm-header-phone">
                  <i className="fa-solid fa-phone cm-sec-bg cm-white-col cm-flex-type-2"></i>
                  <a href={`tel:${phoneNum.value}`} className="cm-prim-col">
                    {phoneNum.label}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="cm-flex-type-2 cm-header-phone-mob cm-lr-pad">
            <i className="fa-solid fa-phone cm-sec-bg cm-white-col cm-flex-type-2"></i>
            {!!phoneNum ? (
              <a href={`tel:${phoneNum.value}`} className="cm-prim-col">
                {phoneNum.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
