import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Circuito from "./circuito";

import Image from './Image'
import './Home.css'
import ModalPayment from "./ModalPayment";

export default function Home() {
  return (
    <div className="HomeMainContainer">
      <Navbar />
        <Circuito/>
        <Image />
      <Footer />
    </div>
  );
}
