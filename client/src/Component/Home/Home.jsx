import React from 'react'
import Ads from '../Ads/Ads'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Soy Home</h1>
      <Ads/>
      <Link to="/home/validate">validate</Link>
    </div>
  )
}

export default Home
