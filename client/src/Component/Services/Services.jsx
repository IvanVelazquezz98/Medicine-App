import React from 'react'
import Ads from '../Ads/Ads'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Services.css' 

function Services() {
  return (
    //el user profile iria en la navbar, pero aun no hay, lo pongo aca par probarlo
    <div>
      <Navbar />
      <div className="prueba">
      <Ads/>
      </div>
      <div className='hola'></div>
      <Footer/>
      
    </div>
  )
}

export default Services
