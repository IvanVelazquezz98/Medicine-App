import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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
  email,
}) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/calendar");
  }

  return (
    <div className="cardDiv">
      {/* card image */}
      <div className="CardImage">
        <img src={userimage} alt="User Image" />
      </div>

      {/* Body */}
      <div className="CardBody">
        {/* card title */}
        <div className="CardTitle">
          <Link to={`/professional/` + medicalLicense}>
            <div>{name}-MN</div>
            <div>{medicalLicense}</div>
          </Link>
        </div>

        {/* speciality */}
        <div className="specialityDiv">{especialidad}</div>

        {/* services */}
        <div className="serviceDiv">{serviceType}</div>

        {/* fee */}
        <div className="fee">Precio:${precio}</div>

        {/* if he/she 's a professional */}
        <div className="ifPro">
          {isProfesional ? (
            <Link to={`/calendar/` + adID}>
              <Button variant="primary">Crea/Edita Turnos</Button>
            </Link>
          ) : (
            <Link to={`/home/` + adID}>
              <Button variant="primary">Turnos</Button>
            </Link>
          )}
          {/* <Link to={`/home/` + adID}></Link> */}
        </div>
      </div>
    </div>
  );
}
