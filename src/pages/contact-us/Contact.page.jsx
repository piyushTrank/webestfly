import React from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/notifications/notifications.action";
import { phoneNum } from "../../utils/globalVars";

import "./Contact.styles.css";

const initial_state = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactPage = () => {
  const dispatch = useDispatch();
  const [formVal, setFormVal] = React.useState(initial_state);

  const handleChange = (e, fieldName) => {
    setFormVal({
      ...formVal,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formVal", formVal);

    if (
      formVal.name === "" ||
      formVal.email === "" ||
      formVal.phone === "" ||
      formVal.message === ""
    ) {
      dispatch(
        showToast({
          type: "error",
          msg: "Fields marked (*) are required.",
        })
      );
    } else {
      dispatch(
        showToast({
          type: "success",
          msg: "FormSubmitted successfuly.",
        })
      );
      setFormVal(initial_state);
    }
  };

  return (
    <div className="cm-contact-page-container">
      <div className="cm-section cm-banner-container cm-prim-bg cm-white-col">
        <div className="cm-page-center cm-lr-pad">
          <h2 className="cm-section-h">Contact Us</h2>
        </div>
      </div>
      <div className="cm-section cm-contact-wrapper">
        <div className="cm-page-center">
          <div className="cm-left-col cm-lr-pad">
            <ul className="cm-menu-ul cm-flex-type-2 cm-flex-align-in">
              <li className="box-shadow-2">
                <i className="fa-solid cm-white-col fa-phone cm-flex-type-2 cm-prim-bg"></i>
                <span>
                  <a href={phoneNum.value}>{phoneNum.label}</a>
                </span>
              </li>
              <li className="box-shadow-2">
                <i className="fa-solid cm-white-col fa-envelope cm-flex-type-2 cm-prim-bg"></i>
                <span>
                  <a href="mailto:contact@webestfly.com">
                    contact@webestfly.com
                  </a>
                </span>
              </li>
              <li className="box-shadow-2">
                <i className="fa-solid cm-white-col fa-location-dot cm-flex-type-2 cm-prim-bg"></i>
                <span>
                  <address>
                    300 Spectrum Center Drive #400, Irvine, CA 92618
                  </address>
                </span>
              </li>
            </ul>
          </div>
          <div className="cm-right-col cm-lr-pad">
            <h3 className="cm-section-sh">Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="cm-form-field-half">
                <div className="cm-form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name*"
                    value={formVal.name}
                    onChange={(e) => handleChange(e, "name")}
                  />
                </div>
                <div className="cm-form-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formVal.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </div>
              </div>
              <div className="cm-form-field-half">
                <div className="cm-form-field">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone*"
                    value={formVal.phone}
                    onChange={(e) => handleChange(e, "phone")}
                  />
                </div>
                <div className="cm-form-field">
                  <input
                    type="text"
                    name="subject"
                    value={formVal.subject}
                    placeholder="Subject"
                    onChange={(e) => handleChange(e, "subject")}
                  />
                </div>
              </div>
              <div className="cm-form-field">
                <textarea
                  name="message"
                  placeholder="Message*"
                  onChange={(e) => handleChange(e, "message")}
                >
                  {formVal.message}
                </textarea>
              </div>
              <div className="cm-form-field-submit">
                <button
                  onClick={handleSubmit}
                  className="cm-btn cm-btn-lg cm-prim-bg cm-white-col cm-uppercase"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
