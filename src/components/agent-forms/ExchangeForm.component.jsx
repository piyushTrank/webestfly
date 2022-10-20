import React from "react";
import moment from "moment";
import ExchangePdf from "../agent-pdf/ExchangePdf.component";

import PDFLink from "../agent-pdf/PdfLink.component";

import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { api_url_mail } from "../../utils/apiInfo";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/notifications/notifications.action";
import { phoneNum } from "../../utils/globalVars";
import DatePickerComp from "../date-picker/DatePickerComp.component";

const initial_state = {
  bookingReference: "",
  tfn: phoneNum.label,
  customerName: "",
  depFrom: "",
  depTo: "",
  arrFrom: "",
  arrTo: "",
  totalPrice: "",
  priceField1: "",
  priceField2: "",
  priceField3: "",
  airlinesName: "",
  paymentMode: "",
  lastDigits: "",
  cardHolder: "",
  cardType: "",
  cardNum: "",
  cardExp: "",
  cardBillAdd: "",
  cardBillPhone: "",
  cardEmail: "",
  address: "",
  itinerary: null,
  itinerary_url: "",
  bookedThrough: "",
  agentName: "",
  agentExt: "",
  showOnePayment: false,
  passenger_info: [
    {
      id: 1,
      value: "",
      dob: new Date(),
    },
  ],
  loading: false,
};

const ExchangeForm = ({ bookData }) => {
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
    console.log("Tetsing", passIndex);

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
          dob: new Date(),
        },
      ],
    });
  };

  const handleDateChange = (dateObj) => {
    const passIndex = dateObj.id;

    setFormVal((prevState) => {
      const newArr = prevState.passenger_info.slice();
      newArr[passIndex - 1].dob = moment(dateObj.date).format("DD/MM/YYYY");

      return {
        ...prevState,
        passenger_info: newArr,
      };
    });
  };

  const renderFields = () => {
    return formVal.passenger_info.map((el) => (
      <div className="cm-form-field-half cm-flex-type-2">
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
        <div className="cm-form-field" key={"dob-" + el.id}>
          <label>Date of Birth</label>
          <DatePickerComp handleDateChange={handleDateChange} elId={el.id} />
        </div>
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
      "airlinesName",
      "paymentMode",
      "lastDigits",
      "cardHolder",
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

    const res = await axios.post(api_url_mail, dataToSend, {
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
    <div id="exchange" className="cm-form-field-container">
      <h2 className="cm-section-h cm-txt-center">Exchange</h2>
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
            readOnly={true}
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
          <label>Price per passenger (Including taxes &amp; fees)</label>
          <input
            type="text"
            name="priceField1"
            onChange={handleInpChange}
            value={formVal.priceField1}
          />
          <span className="cm-helper-txt">Ex: 298.89</span>
        </div>
        <div className="cm-form-field">
          <label>Tax</label>
          <input
            type="text"
            name="priceField2"
            onChange={handleInpChange}
            value={formVal.priceField2}
          />
          <span className="cm-helper-txt">Ex: 71.40</span>
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Fare Difference Price</label>
          <input
            type="text"
            name="priceField3"
            onChange={handleInpChange}
            value={formVal.priceField3}
          />
          <span className="cm-helper-txt">Ex: 526.38</span>
        </div>
        <div className="cm-form-field">
          <label>Airlines Name*</label>
          <input
            type="text"
            name="airlinesName"
            onChange={handleInpChange}
            value={formVal.airlinesName}
          />
        </div>
      </div>
      <div className="cm-form-field cm-checkbox-field cm-flex">
        <input
          type="checkbox"
          name="showOnePayment"
          onChange={(e) =>
            setFormVal({ ...formVal, showOnePayment: e.target.checked })
          }
          value={formVal.showOnePayment}
        />
        <label>Show Final Payment Only</label>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>From (Departure)*</label>
          <input
            type="text"
            name="depFrom"
            onChange={handleInpChange}
            value={formVal.depFrom}
          />
          <span className="cm-helper-txt">Ex: JFK</span>
        </div>
        <div className="cm-form-field">
          <label>To (Departure)*</label>
          <input
            type="text"
            name="depTo"
            onChange={handleInpChange}
            value={formVal.depTo}
          />
          <span className="cm-helper-txt">Ex: MIA</span>
        </div>
      </div>

      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>From (Departure)*</label>
          <input
            type="text"
            name="arrFrom"
            onChange={handleInpChange}
            value={formVal.arrFrom}
          />
          <span className="cm-helper-txt">Ex: MIA</span>
        </div>
        <div className="cm-form-field">
          <label>To (Departure)*</label>
          <input
            type="text"
            name="arrTo"
            onChange={handleInpChange}
            value={formVal.arrTo}
          />
          <span className="cm-helper-txt">Ex: JFK</span>
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
          <span className="cm-helper-txt">Payment Mode/Card Name</span>
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
      <div className="cm-form-field-full">
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
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Card Holder*</label>
          <input
            type="text"
            name="cardHolder"
            onChange={handleInpChange}
            value={formVal.cardHolder}
          />
        </div>
        <div className="cm-form-field">
          <label>Card Type*</label>
          <input
            type="text"
            name="cardType"
            onChange={handleInpChange}
            value={formVal.cardType}
          />
        </div>
      </div>
      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Card Expiry Date*</label>
          <input
            type="text"
            name="cardExp"
            onChange={handleInpChange}
            value={formVal.cardExp}
          />
          <span className="cm-helper-txt">Ex: DD/MM</span>
        </div>
        <div className="cm-form-field">
          <label>Card Billing Address*</label>
          <input
            type="text"
            name="cardBillAdd"
            onChange={handleInpChange}
            value={formVal.cardBillAdd}
          />
        </div>
      </div>

      <div className="cm-form-field-half cm-flex-type-2">
        <div className="cm-form-field">
          <label>Card Phone Number*</label>
          <input
            type="text"
            name="cardBillPhone"
            onChange={handleInpChange}
            value={formVal.cardBillPhone}
          />
        </div>
        <div className="cm-form-field">
          <label>Card email*</label>
          <input
            type="text"
            name="cardEmail"
            onChange={handleInpChange}
            value={formVal.cardEmail}
          />
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
        {/* <input
          type="submit"
          value="SUBMIT"
          className="cm-btn cm-sec-bg cm-white-col cm-wd-100"
          onClick={handleFormSubmit}
        /> */}
        {bookData.bookingMethod === "send-mail" ? (
          <input
            type="submit"
            value={isLoading ? "Sending Mail..." : "SEND MAIL"}
            className="cm-btn cm-sec-bg cm-white-col cm-wd-100"
            onClick={!isLoading ? handleFormSubmit : null}
          />
        ) : (
          <PDFLink data={formVal} pdfComp={<ExchangePdf data={formVal} />} />
        )}
      </div>
    </div>
  );
};

export default ExchangeForm;
