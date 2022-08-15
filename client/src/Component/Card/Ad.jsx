import React from "react";
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
    <div className="base">
      <div className="public">
        <div id="card">
          <div className="image">
            <img
              className="incledible"
              src={userimage}
              alt="image"
              width="5px"
              height="5px"
            />
          </div>
          <div id="content">
            <Link
              to={`/professional/` + medicalLicense}
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              <h2>
                {name} - ML {medicalLicense}
              </h2>
            </Link>
            <h1 className="card-title">{especialidad}</h1>

            <li>{serviceType}</li>
            {/* <li>{ranking}</li> */}
            <li> Precio: {precio}</li>

            <div id="price">
            {isProfesional?
             <Link
             to={`/calendar/` + adID}
             style={{ textDecoration: "inherit", color: "inherit" }}
         
           >
                  <button> Crea/Edita Turnos</button>
                  </Link>:
              <Link
                to={`/home/` + adID}
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                  <button> Turnos</button>

              </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
