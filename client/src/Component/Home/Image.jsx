import React from 'react'
import fondo from '../../assets/fondo.png'


function Image() {
  return (
    <div className="footer-container">
        <div className="footer-parent">
            <img src={fondo} alt='No hay conexión a internet ' className='Im'/>
            </div>
     
   </div>
  )
}

export default Image
