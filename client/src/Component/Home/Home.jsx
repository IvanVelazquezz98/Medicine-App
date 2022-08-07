import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'

export default function Home() {

    
    return (
      <div>
        <Navbar />
          <h1 /* className={style.h1} */>LANDING PAGE , VA A ESTAR LA PRIEMR PAGINA DEL WIX</h1>
          <Link  to='/services'><button >click aca para ver medicos</button></Link>
          <Footer/>
      </div>
    )}