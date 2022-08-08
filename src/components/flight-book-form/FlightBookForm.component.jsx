import React from "react";
import DateSelector from "../date-selector/DateSelector.component";
import NationalitySelect from "./NationalitySelect.component";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/notifications/notifications.action";

const FlightBookForm = ({ travData, grandTotal }) => {
  // console.log("travData", travData);
  const dispatch = useDispatch();
  const [formVal, setFormVal] = React.useState({
    phoneNumCode: "+1",
    phoneNum: "",
    altPhoneNumCode: "+1",
    altPhoneNum: "",
    email: "",
    address1: "",
    address2: "",
    country: "US",
    state: "",
    city: "",
    zipCode: "",
    cardNum: "",
    cardHolderName: "",
    cardExpMonth: "",
    cardExpYr: "",
    cardCvv: "",
    acceptTnc: false,
  });

  const chkReqFields = (arr, dataKey) => {
    let isValid = true;
    arr.forEach((el) => {
      console.log(el, formVal[el]);
      if (formVal[el] === "") isValid = false;
    });

    return isValid;
  };

  const chkTravDet = () => {
    let isPassValid = true;
    const chkFields = ["firstName", "lastName", "gender", "dob"];

    for (let key in passInfo) {
      chkFields.forEach((el) => {
        if (passInfo[key][el] === "") isPassValid = false;
      });
    }

    return isPassValid;
  };

  const flightBookSubmit = () => {
    const chkArr = [
      "phoneNum",
      "email",
      "address1",
      "country",
      "state",
      "city",
      "zipCode",
      "cardNum",
      "cardHolderName",
      "cardExpMonth",
      "cardExpYr",
      "cardCvv",
    ];

    console.log(
      'chkReqFields(chkArr, "formVal")',
      chkReqFields(chkArr, "formVal")
    );

    if (!chkReqFields(chkArr, "formVal") || !chkTravDet()) {
      dispatch(
        showToast({
          msg: "Fields marked (*) are required.",
          type: "error",
        })
      );

      return;
    }
  };

  const loadTravDataFields = () => {
    let dataFields = {};
    for (let i = 0; i < travData.length; i++) {
      dataFields[
        travData[i].travelerType.toLowerCase() + travData[i].travelerId
      ] = {
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "male",
        dob: "",
        nationality: "US",
        passportNum: "",
        passportIssueDt: "",
        passportExpDt: "",
        redressNum: "",
        travelerType: travData[i].travelerType,
      };
    }

    return dataFields;
  };

  const [passInfo, setPassInfo] = React.useState(loadTravDataFields());

  // console.log("passInfo", passInfo);

  const handlePassChange = (e, fieldName, travId) => {
    setPassInfo({
      ...passInfo,
      [travId]: {
        ...passInfo[travId],
        [fieldName]: e.target.value,
      },
    });
  };

  const handleDateChange = (selDate, fieldName) => {
    const splitFieldName = fieldName.toString().split("&");
    setPassInfo({
      ...passInfo,
      [splitFieldName[0]]: {
        ...passInfo[splitFieldName[0]],
        [splitFieldName[1]]: selDate,
      },
    });
  };

  const loadTravFields = () => {
    return travData.map((el) => (
      <div key={el.travelerId} className="cm-form-field-grp cm-pass-info-wrap">
        <div className="cm-form-field-third cm-top">
          <h3 className="cm-section-sh cm-prim-bg cm-white-col">
            {el.travelerId}. {el.travelerType}
          </h3>
          <div className="cm-form-field">
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={
                passInfo[el.travelerType.toLowerCase() + el.travelerId]
                  .firstName
              }
              onChange={(e) =>
                handlePassChange(
                  e,
                  "firstName",
                  el.travelerType.toLowerCase() + el.travelerId
                )
              }
            />
          </div>
          <div className="cm-form-field">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={
                passInfo[el.travelerType.toLowerCase() + el.travelerId]
                  .middleName
              }
              onChange={(e) =>
                handlePassChange(
                  e,
                  "middleName",
                  el.travelerType.toLowerCase() + el.travelerId
                )
              }
            />
          </div>
          <div className="cm-form-field">
            <label>Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={
                passInfo[el.travelerType.toLowerCase() + el.travelerId].lastName
              }
              onChange={(e) =>
                handlePassChange(
                  e,
                  "lastName",
                  el.travelerType.toLowerCase() + el.travelerId
                )
              }
            />
          </div>
        </div>

        <div className="cm-form-field-third">
          <div className="cm-form-field">
            <label>Gender*</label>
            <select
              name="gender"
              value={
                passInfo[el.travelerType.toLowerCase() + el.travelerId].gender
              }
              onChange={(e) =>
                handlePassChange(
                  e,
                  "gender",
                  el.travelerType.toLowerCase() + el.travelerId
                )
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="cm-form-field">
            <label>Date of Birth*</label>
            <DateSelector
              selectedDate={
                passInfo[el.travelerType.toLowerCase() + el.travelerId].dob
              }
              handleDateChange={handleDateChange}
              fieldName={el.travelerType.toLowerCase() + el.travelerId + "&dob"}
            />
          </div>
          <div className="cm-form-field">
            <label>Nationality</label>
            <NationalitySelect
              selectedVal={
                passInfo[el.travelerType.toLowerCase() + el.travelerId]
                  .nationality
              }
              handleSelectChange={handlePassChange}
              travId={el.travelerType.toLowerCase() + el.travelerId}
              fieldName="nationality"
            />
          </div>
        </div>
        <div className="cm-form-field-fourth">
          <div className="cm-form-field">
            <label>Passport Number</label>
            <input
              type="text"
              name="passportNum"
              value={
                passInfo[el.travelerType.toLowerCase() + el.travelerId]
                  .passportNum
              }
              onChange={(e) =>
                handlePassChange(
                  e,
                  "passportNum",
                  el.travelerType.toLowerCase() + el.travelerId
                )
              }
            />
          </div>
          <div className="cm-form-field">
            <label>Passport Issue Date</label>
            <DateSelector
              selectedDate={
                passInfo[el.travelerType.toLowerCase() + el.travelerId]
                  .passportIssueDt
              }
              handleDateChange={handleDateChange}
              fieldName={
                el.travelerType.toLowerCase() +
                el.travelerId +
                "&passportIssueDt"
              }
            />
          </div>
          <div className="cm-form-field">
            <label>Passport Expiration Date</label>
            <DateSelector
              selectedDate={
                passInfo[el.travelerType.toLowerCase() + el.travelerId]
                  .passportExpDt
              }
              handleDateChange={handleDateChange}
              fieldName={
                el.travelerType.toLowerCase() + el.travelerId + "&passportExpDt"
              }
            />
          </div>
          <div className="cm-form-field">
            <label>Redress Number</label>
            <input
              type="text"
              name="redressNum"
              value={
                passInfo[el.travelerType.toLowerCase() + el.travelerId]
                  .redressNum
              }
              onChange={(e) =>
                handlePassChange(
                  e,
                  "redressNum",
                  el.travelerType.toLowerCase() + el.travelerId
                )
              }
            />
          </div>
        </div>
      </div>
    ));
  };

  const loadFares = () => {
    return (
      <table
        className="table table-bordered"
        border="1"
        cellPadding="0"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Passenger</th>
            <th>
              Base (<span currency="code">USD</span>)
            </th>
            <th>
              Total (<span currency="code">USD</span>)
            </th>
          </tr>
        </thead>
        <tbody>
          {travData.map((el) => (
            <tr key={el.travelerId}>
              <td>{el.travelerId}</td>
              <td>{el.travelerType}</td>
              <td currency="value" fare="921.00">
                {el.price.base}
              </td>
              <td currency="value" fare="1552.50">
                {el.price.total}
              </td>
            </tr>
          ))}
          <tr>
            <th colSpan={3}>
              Grand Total (<span currency="code">USD</span>)
            </th>
            <td
              currency="value"
              className="cm-gd-total cm-wt-700 cm-sec-col2"
              fare={grandTotal}
            >
              {grandTotal}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const handleFieldChange = (e, fieldName) => {
    setFormVal({
      ...formVal,
      [fieldName]: e.target.value,
    });
  };

  // console.log("formVal", formVal);

  return (
    <div className="cm-section cm-fl-book-form">
      <div className="cm-form-section cm-pass-contact-info">
        <div className="cm-form-head cm-sec-bg2">
          <h3 className="cm-section-sh">Passenger Contact Information</h3>
        </div>
        <div className="cm-form-field-grp">
          <div className="cm-form-field cm-flex">
            <label>Phone Number*</label>
            <div className="cm-phone-inp">
              <input
                type="text"
                placeholder="+1"
                name="phoneNumCode"
                value={formVal.phoneNumCode}
                onChange={(e) => handleFieldChange(e, "phoneNumCode")}
              />
              <input
                value={formVal.phoneNum}
                type="tel"
                name="phoneNum"
                placeholder="Enter Phone Number"
                onChange={(e) => handleFieldChange(e, "phoneNum")}
              />
            </div>
          </div>
          <div className="cm-form-field cm-flex">
            <label>Alternate Phone Number</label>
            <div className="cm-phone-inp">
              <input
                value={formVal.altPhoneNumCode}
                type="text"
                placeholder="+1"
                name="altPhoneNumCode"
                onChange={(e) => handleFieldChange(e, "altPhoneNumCode")}
              />
              <input
                type="tel"
                name="altPhoneNum"
                placeholder="Enter Alternate Phone Number"
                value={formVal.altPhoneNum}
                onChange={(e) => handleFieldChange(e, "altPhoneNum")}
              />
            </div>
          </div>
          <div className="cm-form-field cm-flex">
            <label>Email*</label>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter email Address"
                onChange={(e) => handleFieldChange(e, "email")}
                value={formVal.email}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cm-form-section">
        <div className="cm-form-head cm-sec-bg2">
          <h3 className="cm-section-sh">Passenger Information</h3>
        </div>
        <p>
          IMPORTANT: Each passengers' full name must be entered as it appears on
          their passport or government issued photo ID. Name changes are not
          permitted after booking.
        </p>
        <h5>Enter Traveler(s) Details Below:</h5>
        {loadTravFields()}
        {/* <div className="cm-form-field-grp cm-pass-info-wrap">
          <div className="cm-form-field-third cm-top">
            <h3 className="cm-section-sh cm-prim-bg cm-white-col">1. Adult</h3>
            <div className="cm-form-field">
              <label>First Name*</label>

              <input type="text" name="firstName" />
            </div>
            <div className="cm-form-field">
              <label>Middle Name</label>

              <input type="text" name="middleName" />
            </div>
            <div className="cm-form-field">
              <label>Last Name*</label>

              <input type="text" name="lastName" />
            </div>
          </div>

          <div className="cm-form-field-third">
            <div className="cm-form-field">
              <label>Gender*</label>
              <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="cm-form-field">
              <label>Date of Birth*</label>
              <DateSelector selectedDate={new Date()} />
            </div>
            <div className="cm-form-field">
              <label>Nationality</label>
              <NationalitySelect />
            </div>
          </div>
          <div className="cm-form-field-fourth">
            <div className="cm-form-field">
              <label>Passport Number</label>
              <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="cm-form-field">
              <label>Passport Issue Date</label>
              <DateSelector selectedDate={new Date()} />
            </div>
            <div className="cm-form-field">
              <label>Passport Expiration Date</label>
              <DateSelector selectedDate={new Date()} />
            </div>
            <div className="cm-form-field">
              <label>Redress Number</label>
              <input type="text" name="redressNum" />
            </div>
          </div>
        </div> */}
      </div>

      <div className="cm-fl-res-fares-tab cm-form-section">
        <div className="cm-form-head cm-sec-bg2">
          <h3 className="cm-section-sh">Pricing Details</h3>
        </div>
        {loadFares()}
      </div>

      <div className="cm-form-section">
        <div className="cm-form-head cm-sec-bg2">
          <h3 className="cm-section-sh">Payment Information</h3>
        </div>
        <div className="cm-form-field-grp cm-pay-info-wrap">
          <div className="cm-form-field-half">
            <div className="cm-form-field">
              <label>
                Credit/Debit Card No.<sup>*</sup>
              </label>
              <input
                type="text"
                name="cardNum"
                value={formVal.cardNum}
                onChange={(e) => handleFieldChange(e, "cardNum")}
              />
            </div>
            <div className="cm-form-field">
              <label>
                Card Holder's Name<sup>*</sup>
              </label>
              <input
                type="text"
                name="cardHolderName"
                value={formVal.cardHolderName}
                onChange={(e) => handleFieldChange(e, "cardHolderName")}
              />
            </div>
          </div>
          <div className="cm-form-field-half">
            <div className="cm-form-field">
              <div className="cm-form-field-half">
                <div className="cm-form-field">
                  <label>
                    Expiry Date<sup>*</sup>
                  </label>
                  <select
                    name="cardExpMonth"
                    value={formVal.cardExpMonth}
                    onChange={(e) => handleFieldChange(e, "cardExpMonth")}
                  >
                    <option value="">Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div className="cm-form-field">
                  <label>
                    Expiry Year<sup>*</sup>
                  </label>
                  <select
                    name="cardExpYr"
                    value={formVal.cardExpYr}
                    onChange={(e) => handleFieldChange(e, "cardExpYr")}
                  >
                    <option value="">Year</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                    <option value="2036">2036</option>
                    <option value="2037">2037</option>
                    <option value="2038">2038</option>
                    <option value="2039">2039</option>
                    <option value="2040">2040</option>
                    <option value="2041">2041</option>
                    <option value="2042">2042</option>
                    <option value="2043">2043</option>
                    <option value="2044">2044</option>
                    <option value="2045">2045</option>
                    <option value="2046">2046</option>
                    <option value="2047">2047</option>
                    <option value="2048">2048</option>
                    <option value="2049">2049</option>
                    <option value="2050">2050</option>
                    <option value="2051">2051</option>
                    <option value="2052">2052</option>
                    <option value="2053">2053</option>
                    <option value="2054">2054</option>
                    <option value="2055">2055</option>
                    <option value="2056">2056</option>
                    <option value="2057">2057</option>
                    <option value="2058">2058</option>
                    <option value="2059">2059</option>
                    <option value="2060">2060</option>
                    <option value="2061">2061</option>
                    <option value="2062">2062</option>
                    <option value="2063">2063</option>
                    <option value="2064">2064</option>
                    <option value="2065">2065</option>
                    <option value="2066">2066</option>
                    <option value="2067">2067</option>
                    <option value="2068">2068</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="cm-form-field">
              <label>
                Card Verification Number<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="CVV"
                name="cardCvv"
                value={formVal.cardCvv}
                onChange={(e) => handleFieldChange(e, "cardCvv")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cm-form-section">
        <div className="cm-form-head cm-sec-bg2">
          <h3 className="cm-section-sh">Billing Information</h3>
        </div>
        <div className="cm-form-field-grp cm-pay-info-wrap">
          <div className="cm-form-field-half">
            <div className="cm-form-field">
              <label>
                Address 1<sup>*</sup>
              </label>
              <input
                type="text"
                name="address1"
                value={formVal.address1}
                onChange={(e) => handleFieldChange(e, "address1")}
              />
            </div>
            <div className="cm-form-field">
              <label>Address 2</label>
              <input
                type="text"
                name="address2"
                value={formVal.address2}
                onChange={(e) => handleFieldChange(e, "address2")}
              />
            </div>
          </div>
          <div className="cm-form-field-half">
            <div className="cm-form-field">
              <label>
                Country<sup>*</sup>
              </label>
              <select
                name="country"
                placeholder="Country"
                value={formVal.country}
                onChange={(e) => handleFieldChange(e, "country")}
              >
                <option label="Select Country" value="0" selected="selected">
                  Select Country
                </option>
                <option label="United States" selected="selected" value="US">
                  United States
                </option>
                <option label="Canada" value="CA">
                  Canada
                </option>
                <option label="United Kingdom" value="GB">
                  United Kingdom
                </option>
                <option label="Anguilla" value="AI">
                  Anguilla
                </option>
                <option label="Antigua and Barbuda" value="AG">
                  Antigua and Barbuda
                </option>
                <option label="Argentina" value="AR">
                  Argentina
                </option>
                <option label="Armenia" value="AM">
                  Armenia
                </option>
                <option label="Aruba" value="AW">
                  Aruba
                </option>
                <option label="Australia" value="AU">
                  Australia
                </option>
                <option label="Austria" value="AT">
                  Austria
                </option>
                <option label="Azerbaijan" value="AZ">
                  Azerbaijan
                </option>
                <option label="Bahamas" value="BS">
                  Bahamas
                </option>
                <option label="Bahrain" value="BH">
                  Bahrain
                </option>
                <option label="Barbados" value="BB">
                  Barbados
                </option>
                <option label="Belgium" value="BE">
                  Belgium
                </option>
                <option label="Belize" value="BZ">
                  Belize
                </option>
                <option label="Bermuda" value="BM">
                  Bermuda
                </option>
                <option label="Bolivia" value="BO">
                  Bolivia
                </option>
                <option label="Bosnia Herzegovina" value="BA">
                  Bosnia Herzegovina
                </option>
                <option label="Botswana" value="BW">
                  Botswana
                </option>
                <option label="Brazil" value="BR">
                  Brazil
                </option>
                <option label="British Virgin Islands" value="VG">
                  British Virgin Islands
                </option>
                <option label="Brunei Darussalam" value="BN">
                  Brunei Darussalam
                </option>
                <option label="Bulgaria" value="BG">
                  Bulgaria
                </option>
                <option label="Cambodia" value="KH">
                  Cambodia
                </option>
                <option label="Cayman Islands" value="KY">
                  Cayman Islands
                </option>
                <option label="Chile" value="CL">
                  Chile
                </option>
                <option label="China" value="CN">
                  China
                </option>
                <option label="Costa Rica" value="CR">
                  Costa Rica
                </option>
                <option label="Croatia" value="HR">
                  Croatia
                </option>
                <option label="Cyprus" value="CY">
                  Cyprus
                </option>
                <option label="Czech Republic" value="CZ">
                  Czech Republic
                </option>
                <option label="Denmark" value="DK">
                  Denmark
                </option>
                <option label="Dominica" value="DM">
                  Dominica
                </option>
                <option label="Dominican Republic" value="DO">
                  Dominican Republic
                </option>
                <option label="Ecuador" value="EC">
                  Ecuador
                </option>
                <option label="Egypt" value="EG">
                  Egypt
                </option>
                <option label="El Salvador" value="SV">
                  El Salvador
                </option>
                <option label="Estonia" value="EE">
                  Estonia
                </option>
                <option label="Finland" value="FI">
                  Finland
                </option>
                <option label="France" value="FR">
                  France
                </option>
                <option label="Georgia" value="GE">
                  Georgia
                </option>
                <option label="Germany" value="DE">
                  Germany
                </option>
                <option label="Greece" value="GR">
                  Greece
                </option>
                <option label="Grenada" value="GD">
                  Grenada
                </option>
                <option label="Guadeloupe" value="GP">
                  Guadeloupe
                </option>
                <option label="Guam" value="GU">
                  Guam
                </option>
                <option label="Guatemala" value="GT">
                  Guatemala
                </option>
                <option label="Guyana" value="GY">
                  Guyana
                </option>
                <option label="Haiti" value="HT">
                  Haiti
                </option>
                <option label="Honduras" value="HN">
                  Honduras
                </option>
                <option label="Hong Kong" value="HK">
                  Hong Kong
                </option>
                <option label="Hungary" value="HU">
                  Hungary
                </option>
                <option label="Iceland" value="IS">
                  Iceland
                </option>
                <option label="India" value="IN">
                  India
                </option>
                <option label="Indonesia" value="ID">
                  Indonesia
                </option>
                <option label="Iraq" value="IQ">
                  Iraq
                </option>
                <option label="Ireland" value="IE">
                  Ireland
                </option>
                <option label="Israel" value="IL">
                  Israel
                </option>
                <option label="Italy" value="IT">
                  Italy
                </option>
                <option label="Jamaica" value="JM">
                  Jamaica
                </option>
                <option label="Japan" value="JP">
                  Japan
                </option>
                <option label="Jordan" value="JO">
                  Jordan
                </option>
                <option label="Kazakstan" value="KZ">
                  Kazakstan
                </option>
                <option label="Kuwait" value="KW">
                  Kuwait
                </option>
                <option label="Kyrgyzstan" value="KG">
                  Kyrgyzstan
                </option>
                <option label="Lao Peoples Democratic Republic" value="LA">
                  Lao Peoples Democratic Republic
                </option>
                <option label="Latvia" value="LV">
                  Latvia
                </option>
                <option label="Lebanon" value="LB">
                  Lebanon
                </option>
                <option label="Lithuania" value="LT">
                  Lithuania
                </option>
                <option label="Luxembourg" value="LU">
                  Luxembourg
                </option>
                <option label="Macau" value="MO">
                  Macau
                </option>
                <option label="Malaysia" value="MY">
                  Malaysia
                </option>
                <option label="Malta" value="MT">
                  Malta
                </option>
                <option label="Martinique" value="MQ">
                  Martinique
                </option>
                <option label="Mexico" value="MX">
                  Mexico
                </option>
                <option label="Micronesia" value="FM">
                  Micronesia
                </option>
                <option label="Mongolia" value="MN">
                  Mongolia
                </option>
                <option label="Montserrat" value="MS">
                  Montserrat
                </option>
                <option label="Namibia" value="NA">
                  Namibia
                </option>
                <option label="Netherlands" value="NL">
                  Netherlands
                </option>
                <option label="Netherlands Antilles" value="AN">
                  Netherlands Antilles
                </option>
                <option label="New Zealand" value="NZ">
                  New Zealand
                </option>
                <option label="Nicaragua" value="NI">
                  Nicaragua
                </option>
                <option label="Norway" value="NO">
                  Norway
                </option>
                <option label="Oman" value="OM">
                  Oman
                </option>
                <option label="Palestinian Territory, Occupied" value="PS">
                  Palestinian Territory, Occupied
                </option>
                <option label="Papua New Guinea" value="PG">
                  Papua New Guinea
                </option>
                <option label="Paraguay" value="PY">
                  Paraguay
                </option>
                <option label="Philippines" value="PH">
                  Philippines
                </option>
                <option label="Poland" value="PL">
                  Poland
                </option>
                <option label="Portugal" value="PT">
                  Portugal
                </option>
                <option label="Qatar" value="QA">
                  Qatar
                </option>
                <option label="Republic of Macedonia" value="MK">
                  Republic of Macedonia
                </option>
                <option label="Romania" value="RO">
                  Romania
                </option>
                <option label="Russia" value="RU">
                  Russia
                </option>
                <option label="San Marino" value="SM">
                  San Marino
                </option>
                <option label="Saudi Arabia" value="SA">
                  Saudi Arabia
                </option>
                <option label="Serbia" value="RS">
                  Serbia
                </option>
                <option label="Singapore" value="SG">
                  Singapore
                </option>
                <option label="Slovakia" value="SK">
                  Slovakia
                </option>
                <option label="Slovenia" value="SI">
                  Slovenia
                </option>
                <option label="South Africa" value="ZA">
                  South Africa
                </option>
                <option label="South Korea" value="KR">
                  South Korea
                </option>
                <option label="Spain" value="ES">
                  Spain
                </option>
                <option label="Sri Lanka" value="LK">
                  Sri Lanka
                </option>
                <option label="St. Christopher (St. Kitts) Nevis" value="KN">
                  St. Christopher (St. Kitts) Nevis
                </option>
                <option label="St. Lucia" value="LC">
                  St. Lucia
                </option>
                <option label="St. Pierre and Miquelon" value="PM">
                  St. Pierre and Miquelon
                </option>
                <option label="St. Vincent and The Grenadines" value="VC">
                  St. Vincent and The Grenadines
                </option>
                <option label="Suriname" value="SR">
                  Suriname
                </option>
                <option label="Sweden" value="SE">
                  Sweden
                </option>
                <option label="Switzerland" value="CH">
                  Switzerland
                </option>
                <option label="Syrian Arab Republic" value="SY">
                  Syrian Arab Republic
                </option>
                <option label="Taiwan" value="TW">
                  Taiwan
                </option>
                <option label="Thailand" value="TH">
                  Thailand
                </option>
                <option label="Trinidad and Tobago" value="TT">
                  Trinidad and Tobago
                </option>
                <option label="Turkey" value="TR">
                  Turkey
                </option>
                <option label="Turks and Caicos Islands" value="TC">
                  Turks and Caicos Islands
                </option>
                <option label="Ukraine" value="UA">
                  Ukraine
                </option>
                <option label="United Arab Emirates" value="AE">
                  United Arab Emirates
                </option>
                <option label="Uruguay" value="UY">
                  Uruguay
                </option>
                <option label="US Virgin Islands" value="VI">
                  US Virgin Islands
                </option>
                <option label="Venezuela" value="VE">
                  Venezuela
                </option>
                <option label="Vietnam" value="VN">
                  Vietnam
                </option>
                <option label="Yemen" value="YE">
                  Yemen
                </option>
              </select>
            </div>
            <div className="cm-form-field">
              <label>State*</label>
              <input
                type="text"
                name="state"
                value={formVal.state}
                onChange={(e) => handleFieldChange(e, "state")}
              />
            </div>
          </div>
          <div className="cm-form-field-half">
            <div className="cm-form-field">
              <label>
                City<sup>*</sup>
              </label>
              <input
                type="text"
                name="city"
                value={formVal.city}
                onChange={(e) => handleFieldChange(e, "city")}
              />
            </div>
            <div className="cm-form-field">
              <label>Zip Code*</label>
              <input
                type="text"
                name="zipCode"
                value={formVal.zipCode}
                onChange={(e) => handleFieldChange(e, "zipCode")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cm-rev-policy">
        <h4 className="cm-section-h">Review Policy</h4>
        <ul>
          <li>
            Please note that the tickets are non-transferable and any changes in
            the names are not permitted. Make sure that the information you
            provide is accurate (including the name of the traveler, date of
            travel, etc.).
          </li>
          <li>
            The name of the traveler must match with the passport and other
            government-issued IDs.
          </li>
          <li>
            The price shown on this portal covers applicable taxes and our fees.
            However, some airlines apply additional charges on baggage and other
            services.
          </li>
          <li>
            Discounted flight tickets don't fall under the category of airline
            frequent flyer mileage accrual. Also, fares are not guaranteed until
            ticketed.
          </li>
        </ul>
      </div>

      <div className="cm-tnc-section">
        <h3>Terms and Conditions</h3>
        <label htmlFor="tnc">
          <input type="checkbox" name="tnc" id="tnc" />
          By clicking "Confirm Booking", I agree that I have read and accept
          webestfly.com's Privacy Policy & User Agreement
        </label>
      </div>

      <div className="cm-form-section-submit">
        <button
          onClick={flightBookSubmit}
          className="cm-btn cm-prim-bg cm-white-col cm-wd-100 cm-btn-lg"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default FlightBookForm;
