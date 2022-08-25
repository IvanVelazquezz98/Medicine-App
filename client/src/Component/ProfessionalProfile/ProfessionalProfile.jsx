import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfessionalById, getAds } from "../../Redux-actions";
import Ad from "../Card/Ad";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import "./ProfessionalProfile.css";
import ImageUser from "../UserProfile/imageProfile";

export default function ProfessionalProfile() {
  const dispatch = useDispatch();

  const { professionalID } = useParams();

  let professionalProfile = useSelector((state) => state.professionalProfile);
  let ads = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(getProfessionalById(professionalID));
    dispatch(getAds);
  }, [dispatch, professionalID]);

  let professionalAds = ads.filter(
    (ad) => ad.professionalMedicalLicense === professionalID
  );

  return (
    <>
      
      <div className="professionalContainer">
        <div className="primercont">
          <div className="pofessionaPicture">
            <img src={professionalProfile.user?.userimage} className="image" />
          </div>

          <div className="professionalInfo ">
            <div>
              <strong>Matrícula:</strong> {professionalProfile.medicalLicense}{" "}
            </div>
            <div>
              <strong>Nombre:</strong> {professionalProfile.user?.name}
            </div>
            <div>
              <strong>Nacimiento:</strong>{" "}
              {professionalProfile.user?.dateOfBirth}
            </div>
            <div>
              <strong>País:</strong> {professionalProfile.user?.country},{" "}
            </div>
            <div>
              <strong>Ciudad:</strong>
              {professionalProfile.user?.city}
            </div>
            <div>{professionalProfile?.ranking}</div>
            <div>{professionalProfile?.User?.dateOfBirth}</div>
          </div>
        </div>
        <div className="sobreMi">
            <strong>Sobre mí: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio sapiente accusamus error praesentium optio quibusdam aperiam quo debitis libero natus excepturi vitae porro, dolore quasi repudiandae accusantium corrupti eligendi quaerat.
        </div>

          <div className="titleAppointment">Turnos del Profesional.</div>
        <div className="appointmentAvailability">
            {professionalAds
              ? professionalAds.map((ad) => {
                  return (
                    <>
                    <Ad
                      key={ad.id}
                      adID={ad.id}
                      name={ad.professional.user.name}
                      medicalLicense={ad.professionalMedicalLicense}
                      especialidad={ad.specialty}
                      serviceType={ad.serviceType}
                      precio={ad.price}
                      ranking={ad.professional.ranking}
                      userimage={ad.professional.user.userimage}
                      email={ad.professional.user.email}
                    />
                    {/* <Link to={`/home/` + ad.id}>
                      <Button variant="primary">Turnos</Button>
                    </Link>
                    <Link to={`/services`}>
                    <Button variant="secondary">Atras</Button>
                  </Link> */}
                    </>
                  );
                })
              : <div className="noAppointment">No se encontraron turnos del profesional.</div>}
          
        </div>
      </div>
    </>
  );
}

