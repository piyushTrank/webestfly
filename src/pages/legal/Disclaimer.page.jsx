import React from "react";
import "./LegalContent.styles.css";

const DisclaimerPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cm-section cm-legal-content-container">
      <div className="cm-page-center cm-lr-pad">
        <h2 className="cm-section-h">Disclaimer</h2>
        <p>
          The objective of this disclaimer is to establish the general
          limitation of liability and warranties that regulate all users' access
          and use necessarily entail the submission to and acceptance of the
          mentioned general limitation of liability and disclaimer of warranties
          included in this Legal Disclaimer.
        </p>
        <p>
          WeBestFly uses reasonable efforts to ensure that information contained
          in the website is accurate as of the date of publication but makes no
          warranty or representation with respect to the accuracy of such
          information. Any dependency you place on such information is therefore
          strictly at the user's own risk, not the website. All rights to the
          intellectual property of the material contained in the website belong
          to and remain solely with WeBestFly. Users are solely responsible for
          the use and protection of their user ID/ password used on our website.
        </p>
        <p>
          WeBestFly is not responsible in any way for the content, claims,
          offers, statements and visual elements of any website that is linked
          to or from the website, regardless whether the link was authorized by
          WeBestFly.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerPage;
