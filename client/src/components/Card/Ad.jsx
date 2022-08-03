import React from 'react';

export default function Ad({name, medicalLicense, especialidad, serviceType, modalidad, precio, ranking}) {
 

    return (
    <div>
        <h2>{name} - ML {medicalLicense}</h2>
        <h3>{serviceType}</h3>
        <h4>{especialidad}</h4>
        <h5>{modalidad}</h5>
        <h5>{precio}</h5>
        <h5>{ranking}</h5>
    </div>
  );
}
