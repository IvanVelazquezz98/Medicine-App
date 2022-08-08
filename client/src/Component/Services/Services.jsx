import React from 'react'
import Ads from '../Ads/Ads'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

function Services() {
  return (
    //el user profile iria en la navbar, pero aun no hay, lo pongo aca par probarlo
    <div>
      <Navbar />

      <h1>aca estan todos servicios</h1>
      <Ads />
      <Footer/>
      
    </div>
  )
}

export default Services
