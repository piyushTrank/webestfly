import React from "react";
import CancelRefundForm from "../../components/agent-forms/CancelRefundForm.component";

import ExchangeForm from "../../components/agent-forms/ExchangeForm.component";
import FutureCreditForm from "../../components/agent-forms/FutureCreditForm.component";
import NewBookingForm from "../../components/agent-forms/NewBookingForm.component";
import "./AgentForm.styles.css";

const AgentFormContainer = () => {
  const [formData, setFormData] = React.useState({
    bookingType: "exchange",
    bookingMethod: "send-mail",
    receiverEmail: "",
    emailSubject: "",
  });

  const handleBookingType = (e) => {
    setFormData({
      ...formData,
      bookingType: e.target.value,
    });
  };

  const handleBookingMethod = (e) => {
    setFormData({
      ...formData,
      bookingMethod: e.target.value,
    });
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const renderForm = () => {
    if (formData.bookingType === "exchange") {
      return <ExchangeForm bookData={formData} />;
    } else if (formData.bookingType === "cancelRefund") {
      return <CancelRefundForm bookData={formData} />;
    } else if (formData.bookingType === "newBooking") {
      return <NewBookingForm bookData={formData} />;
    } else if (formData.bookingType === "futureCredit") {
      return <FutureCreditForm bookData={formData} />;
    } else {
      return <p>Invalid Booking Type.</p>;
    }
  };

  return (
    <div className="cm-agent-form-container">
      <div className="cm-form-container">
        <div className="cm-form-field">
          <label>Choose Booking Type:</label>
          <div className="cm-radio-field-grp cm-flex-type-1">
            <label className="cm-radio-field-item cm-flex-type-2">
              <input
                type="radio"
                name="bookingType"
                value="exchange"
                checked={formData.bookingType === "exchange"}
                onChange={handleBookingType}
              />
              <span>Exchange</span>
            </label>
            <label className="cm-radio-field-item cm-flex-type-2">
              <input
                type="radio"
                name="bookingType"
                value="cancelRefund"
                checked={formData.bookingType === "cancelRefund"}
                onChange={handleBookingType}
              />
              <span>Cancel & Refund</span>
            </label>
            <label className="cm-radio-field-item cm-flex-type-2">
              <input
                type="radio"
                name="bookingType"
                value="newBooking"
                checked={formData.bookingType === "newBooking"}
                onChange={handleBookingType}
              />
              <span>New Booking</span>
            </label>
            <label className="cm-radio-field-item cm-flex-type-2">
              <input
                type="radio"
                name="bookingType"
                value="futureCredit"
                checked={formData.bookingType === "futureCredit"}
                onChange={handleBookingType}
              />
              <span>Future Credit</span>
            </label>
          </div>
        </div>
        <div className="cm-form-field">
          <label>Choose Booking Method:</label>
          <div className="cm-radio-field-grp cm-flex">
            <label className="cm-radio-field-item cm-flex-type-2">
              <input
                type="radio"
                name="bookingMethod"
                value="send-mail"
                checked={formData.bookingMethod === "send-mail"}
                onChange={handleBookingMethod}
              />
              <span>Send Mail</span>
            </label>
            <label className="cm-radio-field-item cm-flex-type-2">
              <input
                type="radio"
                name="bookingMethod"
                value="download-pdf"
                checked={formData.bookingMethod === "download-pdf"}
                onChange={handleBookingMethod}
              />
              <span>Download Pdf</span>
            </label>
          </div>
        </div>

        {formData.bookingMethod === "send-mail" ? (
          <div className="cm-form-field-half cm-flex-type-2">
            <div className="cm-form-field">
              <label>Receiver's Email*:</label>
              <input
                type="email"
                name="receiverEmail"
                onChange={handleFieldChange}
                value={formData.receiverEmail}
              />
            </div>
            <div className="cm-form-field">
              <label>Email Subject*:</label>
              <input
                type="text"
                name="emailSubject"
                onChange={handleFieldChange}
                value={formData.emailSubject}
              />
            </div>
          </div>
        ) : null}

        {renderForm()}
      </div>
    </div>
  );
};

export default AgentFormContainer;
