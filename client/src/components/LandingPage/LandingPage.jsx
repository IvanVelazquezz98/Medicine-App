import React from 'react';
import { Link } from 'react-router-dom';


export default function LandingPage() {

    
    return (
      <div>
        
       
          <h1 /* className={style.h1} */>LANDING PAGE , VA A ESTAR LA PRIEMRA PAGINA DEL WIX</h1>
          <Link  to={'/home'}><button >click para ver mas medicos</button></Link>
        
      </div>
    )}