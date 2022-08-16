import React from 'react'
import './Text.css'
import Circuito from './circuito'
import {Link} from 'react-router-dom'


function Text() {
  return (
    <div className="perfil-container">
      <div className="perfil-parent">
        <div className="perfil-details">
          <div className="colz">
            <div className="colz-icon">
              <a href="www.google.com">
                <i className="fa fa-facebook-square"></i>
              </a>
              <a href="www.google.com">
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="perfil-details-name">
            <span className="primary-text">
              {" "}
              AY
              <span className="highlighted-text"> DOC</span>
            </span>
          </div>

          <div className="perfil-details-role">
            <span className="primary-text">
              {" "}
              <h1>
                {" "}
                <Circuito
                />
              </h1>
              <span className="perfil-role-tagline">
                Escoge como atenderte
              </span>
            </span>
          </div>
          <div className="perfil-options">
          <Link  to='/services' style={{textDecoration: 'inherit', color: 'inherit'}}>
            <button className="btn highlighted-btn">Ver mas</button> <br/>
            </Link>
            <span className="perfil-role-tagline2"><br/>
               ¿Eres profesional de salud?
              </span> <br/><br/><br/>
              <Link  to="/home/validate" style={{textDecoration: 'inherit', color: 'inherit'}}>
              <button className="btn highlighted-btn">Unete al equipo</button>
              </Link>
          </div>
        </div>
        {/* <div className="perfil-picture">
          <div className="perfil-picture-background"></div>
        </div> */}
      </div>
    </div>
   

  )
}

export default Text
 // <div className="t.wrapper">
    //     <div className="static-text"> Consultas </div>
    //     <ul className="dynamic-txts"> 
    //     <li><span> Presenciales </span></li>
    //     <li><span> Virtuales </span></li>
    //     <li><span> a Domicilio </span></li>
        
    //     </ul>
    //   </div>