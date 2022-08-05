import React from 'react'
import Ads from '../Ads/Ads'
import { Link } from 'react-router-dom'

function Home() {
  return (
    //el user profile iria en la navbar, pero aun no hay, lo pongo aca par probarlo
    <div>
      <h1>Soy Home</h1>
      <Ads/>
      <Link to="/home/validate">validate</Link>
      
    </div>
  )
}

export default Home
