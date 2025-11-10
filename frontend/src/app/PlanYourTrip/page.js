// App.js
import React from "react";
import PlanYourTrip from "../../components/PlanYourTrip/PlanYourTrip";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

function MultiStepTripPlanner() {
  return (
    <div className="App">
      <Header />
      <PlanYourTrip />
      <Footer />
    </div>
  );
}

export default MultiStepTripPlanner;
