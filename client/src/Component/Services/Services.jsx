import React from "react";
import Ads from "../Ads/Ads";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './Services.css'
function Services() {
  return (
    
    <div className="servicesMainContainer">
      <Navbar />

      <Ads />

      {/* <Footer/> */}
    </div>
  );
}

export default Services;
