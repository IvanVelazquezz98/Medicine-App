import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Circuito from "./circuito";
import Image from './Image'
import './Home.css'
import ModalPayment from "./ModalPayment";
import {getAuth} from "firebase/auth";
import firebaseApp from "../../Credential/index";

export default function Home() {

  const auth = getAuth(firebaseApp);
  console.log(auth.currentUser?.email)

  return (
    
    <div className="HomeMainContainer">
      <Navbar />
        <Circuito/>
        <Image />
      <Footer />
    </div>
  );
}
