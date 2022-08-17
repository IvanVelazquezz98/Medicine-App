import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import "./Ad.css";

export default function Ad({
  name,
  medicalLicense,
  especialidad,
  serviceType,
  precio,
  ranking,
  adID,
  userimage,
  isProfesional,
  email
}) {

  const navigate = useNavigate()
  function handleNavigate(){
    navigate('/calendar')
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={userimage} />
      <Card.Body>
        <Card.Title style={{ background: 'white' }}><Link
              to={`/professional/` + medicalLicense}
            >{name} - ML {medicalLicense}
        </Link></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{especialidad}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{serviceType}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Precio:${precio}</Card.Subtitle>
        {isProfesional?
             <Link
             to={`/calendar/` + adID}
             
           >
                  <Button variant='primary'>Crea/Edita Turnos</Button>
                  </Link>:
              <Link
                to={`/home/` + adID}
                
              >
                 <Button variant="primary">Turnos</Button>

              </Link>
              }
        <Link
                to={`/home/` + adID}
                
              >
     

              </Link>
      </Card.Body>
    </Card>
  );
}
