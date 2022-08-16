import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'
import Header from './Header'
import ModalPayment from './ModalPayment'




export default function Home() {

 
    return (
      <div>
        <Navbar />
         <Header />
         {/* <ModalPayment /> */}
          <Footer/>
      </div>
    )}