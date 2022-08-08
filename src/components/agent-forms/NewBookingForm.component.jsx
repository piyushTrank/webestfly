import React from "react";
import NewBookingPdf from "../agent-pdf/NewBookingPdf.component";
import PDFLink from "../agent-pdf/PdfLink.component";

import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { api_url_mail } from "../../utils/apiInfo";
import { showToast } from "../../redux/notifications/notifications.action";
import { useDispatch } from "react-redux";

const initial_state = {
  bookingReference: "",
  tfn: "",
  customerName: "",
  totalPrice: "",
  priceField1: "",
  cardStatementCharge1: "",
  cardStatementCharge2: "",
  airlinesName: "",
  paymentMode: "",
  lastDigits: "",
  cardHolder: "",
  cardDetails: "",
  address: "",
  itinerary: null,
  itinerary_url: "",
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

const NewBookingForm = ({ bookData }) => {
  const [formVal, setFormVal] = React.useState(initial_state);
  const [progresspercent, setProgresspercent] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onFileChange = (event) => {
    console.log(
      "This",
      event.target.files[0],
      URL.createObjectURL(event.target.files[0])
    );

    if (bookData.bookingMethod === "send-mail") {
      const file = event.target.files[0];

      if (!file) return;

      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("downloadURL", downloadURL);
            setFormVal({
              ...formVal,
              itinerary: event.target.files[0],
              itinerary_url: downloadURL,
            });
          });
        }
      );
    } else {
      setFormVal({
        ...formVal,
        itinerary: event.target.files[0],
        itinerary_url: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleInpChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassInp = (e) => {
    const passIndex = e.target.id.split("pass-")[1];

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
      "cardStatementCharge1",
      "airlinesName",
      "paymentMode",
      "lastDigits",
      "cardHolder",
      "cardDetails",
      "address",
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

    if (!formVal.itinerary) {
      dispatch(
        showToast({
          type: "error",
          msg: "Please upload Itinerary screenshot.",
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
      setProgresspercent(0);
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
    <div id="newBooking" className="cm-form-field-container">
      <h2 className="cm-section-h cm-txt-center">New Booking</h2>
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
      <div className="cm-form-field-full">
        <div className="cm-form-field">
          <label>Customer Name*</label>
          <input
            type="text"
            name="customerName"
            onChange={handleInpChange}
            value={formVal.customerName}
          />
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
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
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Card Statement Charge #1*</label>
          <input
            type="text"
            name="cardStatementCharge1"
            onChange={handleInpChange}
            value={formVal.cardStatementCharge1}
          />
          <span className="cm-helper-txt">Ex: 183.98</span>
        </div>
        <div className="cm-form-field">
          <label>Card Statement Charge #2</label>
          <input
            type="text"
            name="cardStatementCharge2"
            onChange={handleInpChange}
            value={formVal.cardStatementCharge2}
          />
          <span className="cm-helper-txt">Ex: 15.00</span>
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Airlines Name*</label>
          <input
            type="text"
            name="airlinesName"
            onChange={handleInpChange}
            value={formVal.airlinesName}
          />
        </div>
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
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Last 4 Digits of Card*</label>
          <input
            type="text"
            name="lastDigits"
            onChange={handleInpChange}
            value={formVal.lastDigits}
          />
        </div>
        <div className="cm-form-field">
          <label>Card Holder*</label>
          <input
            type="text"
            name="cardHolder"
            onChange={handleInpChange}
            value={formVal.cardHolder}
          />
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Card Details*</label>
          <input
            type="text"
            name="cardDetails"
            onChange={handleInpChange}
            value={formVal.cardDetails}
          />
        </div>
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
      </div>
      <div className="cm-form-field-full">
        <div className="cm-form-field">
          <label>Address*</label>
          <textarea
            name="address"
            onChange={handleInpChange}
            value={formVal.address}
          ></textarea>
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Upload Itinerary*:</label>
          <input
            type="file"
            name="itinerary"
            onChange={onFileChange}
            accept=".png, .jpg, .jpeg"
          />
          {formVal.itinerary_url !== "" ? (
            <img src={formVal.itinerary_url} alt="Itinerary" />
          ) : null}
          {bookData.bookingMethod === "send-mail" && progresspercent > 0 ? (
            progresspercent !== 100 ? (
              <p>Uploading Image: {progresspercent}%</p>
            ) : (
              <p>Image Uploaded!</p>
            )
          ) : null}
        </div>
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
          <PDFLink data={formVal} pdfComp={<NewBookingPdf data={formVal} />} />
        )}
      </div>
    </div>
  );
};

export default NewBookingForm;
