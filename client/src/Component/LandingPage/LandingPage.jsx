import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'

export default function LandingPage() {

    
    return (
      <div>
        <Navbar />
          <h1 /* className={style.h1} */>LANDING PAGE , VA A ESTAR LA PRIEMRA PAGINA DEL WIX</h1>
          <Link  to='/home'><button >clias mck para ver medicos</button></Link>
          <Footer/>
      </div>
    )}