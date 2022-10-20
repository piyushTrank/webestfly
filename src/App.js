import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./pages/home/HomePage.page";
import NotFoundPage from "./pages/error/NotFound.page";
import CustomToast from "./components/toast/CustomToast.component";
import FlightResult from "./pages/flight-result/FlightResult.page";
import Layout from "./containers/layout/Layout.container";
import BookTicketsPage from "./pages/book-tickets/BookTickets.page";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicy.page";
import TncPage from "./pages/legal/Tnc.page";
import DisclaimerPage from "./pages/legal/Disclaimer.page";
import RefundPolicyPage from "./pages/legal/RefundPolicy.page";
import ContactPage from "./pages/contact-us/Contact.page";
import AboutPage from "./pages/about-us/About.page";
import PackagesPage from "./pages/packages/Packages.page";
import AgentDashPage from "./pages/agent-dash/AgentDash.page";
import { getContactNum } from "./redux/misc/misc.action";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getContactNum());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="flights" element={<FlightResult />} />
            <Route path="booking" element={<BookTicketsPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-and-conditions" element={<TncPage />} />
            <Route path="disclaimer" element={<DisclaimerPage />} />
            <Route path="refund-policy" element={<RefundPolicyPage />} />
            <Route path="contact-us" element={<ContactPage />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="packages" element={<PackagesPage />} />
            <Route path="agent-dash" element={<AgentDashPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <CustomToast />
    </div>
  );
}

export default App;
