import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/notifications/notifications.action";
import { api_url_mail } from "../../utils/apiInfo";
import CancelRefundPdf from "../agent-pdf/CancelRefundPdf.component";
import PDFLink from "../agent-pdf/PdfLink.component";

const initial_state = {
  bookingReference: "",
  tfn: "",
  customerName: "",
  totalPrice: "",
  priceField1: "",
  priceField2: "",
  paymentMode: "",
  lastDigits: "",
  refundAmt: "",
  refundAmtPrice1: "",
  refundAmtPrice2: "",
  phoneNumber: "",
  bookedThrough: "",
  agentName: "",
  agentExt: "",
  passenger_info: [
    {
      id: 1,
      value: "",
    },
  ],
  loading: false,
};

const CancelRefundForm = ({ bookData }) => {
  const [formVal, setFormVal] = React.useState(initial_state);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleInpChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassInp = (e) => {
    const passIndex = e.target.id.split("pass-")[1];
    // console.log("Tetsing", passIndex);

    setFormVal((prevState) => {
      const newArr = prevState.passenger_info.slice();
      newArr[passIndex - 1].value = e.target.value;

      return {
        ...prevState,
        passenger_info: newArr,
      };
    });
  };

  const addMorePassenger = () => {
    let lastElemId =
      formVal.passenger_info[formVal.passenger_info.length - 1].id;

    setFormVal({
      ...formVal,
      passenger_info: [
        ...formVal.passenger_info,
        {
          id: lastElemId + 1,
          value: "",
        },
      ],
    });
  };

  const renderFields = () => {
    // console.log("formVal.passenger_info", formVal.passenger_info);
    // return null;
    return formVal.passenger_info.map((el) => (
      <div className="cm-form-field" key={el.id}>
        <label>Passenger's Name</label>
        <input
          type="text"
          id={"pass-" + el.id}
          name="passengerName"
          value={el.value}
          onChange={handlePassInp}
        />
      </div>
    ));
  };

  const validateForm = () => {
    if (
      bookData.bookingMethod === "send-mail" &&
      (bookData.receiverEmail === "" || bookData.emailSubject === "")
    ) {
      dispatch(
        showToast({
          type: "error",
          msg: "Receiver's Email & Email Subject are required fields",
        })
      );

      return false;
    }

    const req_field = [
      "bookingReference",
      "tfn",
      "customerName",
      "totalPrice",
      "priceField1",
      "priceField2",
      "paymentMode",
      "lastDigits",
      "refundAmt",
      "refundAmtPrice1",
      "phoneNumber",
      "bookedThrough",
      "agentName",
      "agentExt",
    ];

    let isDataValid = true;

    req_field.forEach((el) => {
      if (formVal[el] === "") isDataValid = false;
    });

    if (!isDataValid) {
      dispatch(
        showToast({
          type: "error",
          msg: "Fields marked (*) are required.",
        })
      );

      return false;
    }

    if (formVal.passenger_info[0].value === "") {
      dispatch(
        showToast({
          type: "error",
          msg: "Atleast 1 Passenger's Name is required.",
        })
      );

      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Formval", formVal);

    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const dataToSend = {
      receiverEmail: bookData.receiverEmail,
      emailSubject: bookData.emailSubject,
      data: formVal,
      bookingType: bookData.bookingType,
    };

    const res = await axios.post(`${api_url_mail}`, dataToSend, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });

    console.log("Send Mail res", res.data);

    if (res.data.status === "success") {
      dispatch(
        showToast({
          type: "success",
          msg: res.data.message,
        })
      );
      setFormVal(initial_state);
      setIsLoading(false);
    } else {
      dispatch(
        showToast({
          type: "error",
          msg: res.data.message,
        })
      );
      setIsLoading(false);
    }
  };

  return (
    <div id="cancelRefund" className="cm-form-field-container">
      <h2 className="cm-section-h cm-txt-center">Cancel & Refund</h2>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Booking Reference*</label>
          <input
            type="text"
            name="bookingReference"
            onChange={handleInpChange}
            value={formVal.bookingReference}
          />
        </div>
        <div className="cm-form-field">
          <label>TFN*</label>
          <input
            type="text"
            name="tfn"
            onChange={handleInpChange}
            value={formVal.tfn}
          />
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Customer Name*</label>
          <input
            type="text"
            name="customerName"
            onChange={handleInpChange}
            value={formVal.customerName}
          />
        </div>
        <div className="cm-form-field">
          <label>Total price (including all taxes and fees)*</label>
          <input
            type="text"
            name="totalPrice"
            onChange={handleInpChange}
            value={formVal.totalPrice}
          />
          <span className="cm-helper-txt">Ex: 597.78</span>
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Price per passenger (Including taxes & fees)*</label>
          <input
            type="text"
            name="priceField1"
            onChange={handleInpChange}
            value={formVal.priceField1}
          />
          <span className="cm-helper-txt">Ex: 298.89</span>
        </div>
        <div className="cm-form-field">
          <label>Charge on Card Statement*</label>
          <input
            type="text"
            name="priceField2"
            onChange={handleInpChange}
            value={formVal.priceField2}
          />
          <span className="cm-helper-txt">Ex: 446.92</span>
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Paying Through*</label>
          <input
            type="text"
            name="paymentMode"
            onChange={handleInpChange}
            value={formVal.paymentMode}
          />
          <span className="cm-helper-txt">Payment Mode</span>
        </div>
        <div className="cm-form-field">
          <label>Last 4 Digits of Card*</label>
          <input
            type="text"
            name="lastDigits"
            onChange={handleInpChange}
            value={formVal.lastDigits}
          />
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-repeater-grp cm-form-field">
          <div className="cm-repeater-content">{renderFields()}</div>
          <div className="cm-repeater-btn cm-pass-repeat-btn">
            <button
              className="cm-btn cm-sec-bg cm-white-col"
              onClick={addMorePassenger}
            >
              Add More Passenger
            </button>
          </div>
        </div>
        <div className="cm-form-field">
          <label>Refund Amt*</label>
          <input
            type="text"
            name="refundAmt"
            onChange={handleInpChange}
            value={formVal.refundAmt}
          />
          <span className="cm-helper-txt">Ex: 1061.20</span>
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Refund Amt Price #1*</label>
          <input
            type="text"
            name="refundAmtPrice1"
            onChange={handleInpChange}
            value={formVal.refundAmtPrice1}
          />
          <span className="cm-helper-txt">Ex: 197.46</span>
        </div>
        <div className="cm-form-field">
          <label>Refund Amt Price #2</label>
          <input
            type="text"
            name="refundAmtPrice2"
            onChange={handleInpChange}
            value={formVal.refundAmtPrice2}
          />
          <span className="cm-helper-txt">Ex: 25.00 USD</span>
        </div>
      </div>
      <div className="cm-form-field-full">
        <div className="cm-form-field">
          <label>Phone Number*</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleInpChange}
            value={formVal.phoneNumber}
          />
        </div>
      </div>
      <div className="cm-form-field-full">
        <div className="cm-form-field">
          <label>Booking Confirmed Through*</label>
          <input
            type="text"
            name="bookedThrough"
            onChange={handleInpChange}
            value={formVal.bookedThrough}
          />
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Agent Name*:</label>
          <input
            type="text"
            name="agentName"
            onChange={handleInpChange}
            value={formVal.agentName}
          />
        </div>
        <div className="cm-form-field">
          <label>Agent Extension*</label>
          <input
            type="text"
            name="agentExt"
            onChange={handleInpChange}
            value={formVal.agentExt}
          />
        </div>
      </div>
      <div className="cm-form-field-submit">
        {bookData.bookingMethod === "send-mail" ? (
          <input
            type="submit"
            value={isLoading ? "Sending Mail..." : "SEND MAIL"}
            className="cm-btn cm-sec-bg cm-white-col cm-wd-100"
            onClick={!isLoading ? handleFormSubmit : null}
          />
        ) : (
          <PDFLink
            data={formVal}
            pdfComp={<CancelRefundPdf data={formVal} />}
          />
        )}
      </div>
    </div>
  );
};

export default CancelRefundForm;
