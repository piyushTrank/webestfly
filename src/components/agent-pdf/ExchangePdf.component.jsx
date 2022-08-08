import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import * as React from "react";
import bookRef from "../../assets/images/flight/book_ref.png";

import impInfoImg from "../../assets/images/flight/imp_info.png";
import bulletImg from "../../assets/images/flight/bullet.png";
// import dotImg from "../../assets/images/flight/dot.png";
import popRegular from "../../assets/fonts/OpenSans-Regular.ttf";
import popMedium from "../../assets/fonts/OpenSans-Medium.ttf";
import popBold from "../../assets/fonts/OpenSans-Bold.ttf";

const ExchangePdf = ({ data }) => {
  const member = true;

  const filterArr = [];
  data.passenger_info.forEach((el) => {
    if (el.value !== "") filterArr.push(el.value);
  });

  // console.log("FilterArr", filterArr);

  if (member) {
    return (
      <Document>
        <Page
          size="A4"
          orientation="portrait"
          style={{ ...styles.font, paddingVertical: 15 }}
        >
          <View style={styles.section}>
            <View style={styles.rightBookRef}>
              <View
                style={{
                  width: 200,
                  textAlign: "center",
                }}
              >
                <Image style={styles.bookRef} src={bookRef} />
                <Text
                  style={{
                    marginTop: 15,
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {data.bookingReference}
                </Text>
              </View>
            </View>

            <Text style={styles.tfnNum}>TFN {data.tfn}</Text>
            <Text style={styles.txt}>Dear {data.customerName},</Text>
            <Text style={styles.txt}>
              Total price including all taxes and fees:{" "}
              <Text style={styles.boldTxt}>(${data.totalPrice} USD)</Text>.
            </Text>
            <Text style={styles.txt}>
              <Text style={{ ...styles.boldTxt, textDecoration: "underline" }}>
                Please Note: -
              </Text>{" "}
              As per our conversation and as agreed, we have changed your
              reservation under confirmation{" "}
              <Text style={styles.boldTxt}>#{data.bookingReference}</Text>, with
              price of{" "}
              <Text style={styles.boldTxt}>${data.priceField1} USD</Text> per
              passenger (Including taxes &amp; fees).
            </Text>
            <Text style={styles.txt}>
              There will be {data.priceField3 !== "" ? "2" : "1"} charge
              appearing on your card statement of{" "}
              <Text style={styles.boldTxt}>
                ${data.priceField2} USD Tax ({data.airlinesName})
                {data.priceField3 !== ""
                  ? ` and $${data.priceField3} USD fare difference`
                  : ""}
              </Text>{" "}
              as <Text style={styles.boldTxt}>({data.bookedThrough})</Text>.
            </Text>
            <Text style={styles.txt}>
              We have changed your reservation as you are paying through{" "}
              {data.paymentMode} ending with *******{data.lastDigits}.
            </Text>
            <View style={styles.cardDetWrap}>
              <Text style={{ ...styles.txt, ...styles.boldTxt }}>
                Card Details
              </Text>
              <Text style={{ ...styles.txt, ...styles.boldTxt }}>
                Card Holder: - {data.cardHolder}
              </Text>
              <Text style={{ ...styles.txt, ...styles.boldTxt }}>
                Passenger's Name : - {filterArr.join(", ")}
              </Text>
            </View>
            <View style={styles.addWrap}>
              <Text>**********************************************</Text>
              <Text style={styles.txt}>
                <Text style={styles.boldTxt}>Address</Text>: - {data.address}
              </Text>
              <Text>**********************************************</Text>
            </View>
            <View style={styles.addWrap}>
              <Text style={styles.txt}>
                <Text style={styles.boldTxt}>Itinerary: -</Text>
              </Text>
              {/* <Image style={styles.itiImg} src={itiImg} /> */}
              <Image style={styles.itiImg} src={data.itinerary_url} />
              <Text>**********************************************</Text>
            </View>
            <View style={styles.impInfoWrap}>
              <Image style={styles.impInfoImg} src={impInfoImg} />
              <View style={styles.impInfoItem}>
                <Text>
                  <Image style={styles.bullet} src={bulletImg} />
                  <Text>
                    &nbsp; Date and routing changes will be subject to Airline
                    Penalty and Fare Difference if any.
                  </Text>
                </Text>
              </View>
              <View style={styles.impInfoItem}>
                <Text>
                  <Image style={styles.bullet} src={bulletImg} />
                  <Text>
                    &nbsp; Fares are not guaranteed until ticketed. Your Booking
                    is confirmed through{" "}
                    <Text style={styles.boldTxt}>{data.bookedThrough}</Text>.
                  </Text>
                </Text>
              </View>
              <View style={styles.impInfoItem}>
                <Text>
                  <Image style={styles.bullet} src={bulletImg} />
                  <Text>
                    &nbsp;{" "}
                    <Text
                      style={{ ...styles.boldTxt, textDecoration: "underline" }}
                    >
                      Cancellation Policy:-
                    </Text>
                    <Text>
                      Tickets are Non-Refundable/Non-Transferable and Name
                      changes are not permitted.
                    </Text>
                  </Text>
                </Text>
              </View>
              <View style={styles.impInfoItem}>
                <Text>
                  <Image style={styles.bullet} src={bulletImg} />
                  <Text>
                    &nbsp; All customers are advised to verify travel documents
                    (transit visa/entry visa) for the country through which they
                    are transiting and/or entering.{" "}
                    <Text style={styles.boldTxt}>{data.bookedThrough}</Text>{" "}
                    will not be responsible if proper travel documents are not
                    available and you are denied entry or transit into a
                    Country. We request you to consult the embassy of the
                    country(s) you are visiting or transiting through.
                  </Text>
                </Text>
              </View>
              <View style={{ ...styles.impInfoItem, marginBottom: 0 }}>
                <Text>
                  <Image style={styles.bullet} src={bulletImg} />
                  <Text>
                    &nbsp;{" "}
                    <Text
                      style={{ ...styles.boldTxt, textDecoration: "underline" }}
                    >
                      Please Note:-
                    </Text>
                  </Text>
                </Text>
              </View>
              <Text>
                - Signing this document, you are accepting all the above
                mentioned terms and conditions.
              </Text>
              <Text>
                - Your credit card maybe billed in multiple charges not
                exceeding the total amount.
              </Text>
              <Text>
                - The charge will appear on your card statement as Digital Tutor
              </Text>
            </View>

            <View style={styles.tyWrap}>
              <Text style={{ fontWeight: "700" }}>Thank you,</Text>
              <Text style={{ fontWeight: "700" }}>{data.agentName}</Text>
              <Text style={{ fontWeight: "700" }}>Ext.: {data.agentExt}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  } else
    return (
      <Document>
        <Page size="A4">
          <View>
            <Text>The pdf could not be generated.</Text>
          </View>
        </Page>
      </Document>
    );
};

// const fontSrc =
//   "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf";
// Font.register({ family: "Oswald", src: fontSrc });
Font.register({
  family: "Poppins",
  fonts: [
    { src: popRegular, fontWeight: 400 },
    { src: popMedium, fontWeight: 500 },
    { src: popBold, fontWeight: 700 },
  ],
});

export const styles = StyleSheet.create({
  font: { fontFamily: "Poppins" },
  section: {
    margin: 0,
    paddingHorizontal: 15,
    fontSize: 10,
  },
  rightBookRef: {
    display: "flex",
    alignItems: "flex-end",
  },
  bookRefNum: {
    textAlign: "right",
    marginTop: 5,
  },
  bookRef: {
    width: 174,
    height: 60,
  },
  tfnNum: {
    fontSize: 16,
    color: "#000000",
    fontWeight: 700,
    fontFamily: "Poppins",
    marginBottom: 15,
  },
  txt: {
    fontFamily: "Poppins",
    marginVertical: 5,
    fontWeight: "normal",
    lineHeight: 1.8,
  },
  boldTxt: { fontWeight: "700", fontFamily: "Poppins" },
  itiImg: {
    marginBottom: 10,
    maxWidth: 414,
  },
  impInfoWrap: {
    paddingVertical: 20,
  },
  impInfoImg: {
    marginBottom: 15,
    width: 248,
  },
  bullet: {
    width: 12,
    height: 13,
    marginRight: 10,
  },
  // body: {
  //   paddingTop: 15,
  //   paddingBottom: 15,
  //   paddingHorizontal: 15,
  // },
  impInfoItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  impInfoImg: {
    marginVertical: 20,
    width: 248,
  },
  tyWrap: {
    marginTop: 30,
  },
});

export default ExchangePdf;
