import React from 'react';
import {Link} from 'react-router-dom'

export default function Ad({name, medicalLicense, especialidad, serviceType, modalidad, precio, ranking}) {
 

    return (
    <div>
      <Link to={`/home/`+ medicalLicense}>
        <h2>{name} - ML {medicalLicense}</h2>
      </Link>
        <h3>{serviceType}</h3>
        <h4>{especialidad}</h4>
        <h5>{modalidad}</h5>
        <h5>{precio}</h5>
        <h5>{ranking}</h5>
    </div>
  );
}