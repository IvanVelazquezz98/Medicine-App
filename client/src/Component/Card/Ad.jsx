import React from 'react';
import {Link} from 'react-router-dom'

export default function Ad({name, medicalLicense, especialidad, serviceType, modalidad, precio, ranking, adID}) {
 

    return (

      <div>
        <Link to={`/professional/`+ medicalLicense}>
          <h2>{name} - ML {medicalLicense}</h2>
        </Link>
        <Link to={`/home/`+ adID}>
          <button>view more</button>
        </Link>
          <h3>{serviceType}</h3>
          <h4>{especialidad}</h4>
          <h5>{modalidad}</h5>
          <h5>{precio}</h5>
          <h5>{ranking}</h5>
      </div>
  
  );
}