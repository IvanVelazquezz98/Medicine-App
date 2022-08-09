import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'

export default function Home() {

    
    return (
      <div>
        <Navbar />
         
          <Link  to='/services'><button > Ver los anuncios</button></Link>
          <Footer/>
      </div>
    )}