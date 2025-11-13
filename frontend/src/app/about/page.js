import React from "react";
import PlanYourTrip from "../../components/PlanYourTrip/PlanYourTrip";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AboutPage from "@/components/AboutDetails/AboutDetails";
import WhatsAppBubble from "@/components/Whatsappbubble/WhatsappBubble";

function aboutdetails() {
  return (
    <div>
      <Header />
      <AboutPage />
      <WhatsAppBubble/>
      <Footer />
    </div>
  );
}

export default aboutdetails;
