import React from "react";
import ImageUser from "./imageProfile";
import Favorites from "./favoritesProfessionalUser";
import InfoUser from "./InfoUserProfile";
import HistoryAppointment from "./historyAppointmentUser";
import ModalUnsubscribe from "../Unsubscribe/ModalUnsubscribe";
import CreateAd from "../CreateAd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  addFavorite,
  clearUserDetail,
  getUsersById,
} from "../../Redux-actions/index.js";
import { Link } from "react-router-dom";
import "./StyleProfile.css";
import Ad from "../Card/Ad";
import firebaseApp from "../../Credential/index";
import { getAuth } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import ModalCreateAdd from "../CreateAd/Modal";
import { useNavigate } from "react-router-dom";
import Appointments from "./Apointments";
import Dashboard from "../Admin/Dashboard";
import ProfessionalAppointments from "./ProfessionalAppointments";
import MedicalRecordUser from "./MedicalRecordUser";
import { Button } from "react-bootstrap";
import "./editAdContainer.css";

const UserProfile = () => {
  const auth = getAuth(firebaseApp);
  const User = useSelector((state) => state.userDetail);
  const user = useSelector((state) => state.userValidated);
  console.log('userProfile', user)
  
const dispatch = useDispatch();
const navigate = useNavigate();

  const [button, setButton] = useState(false);
  const [show, setShow] = useState(false);

  let favML = JSON.parse(localStorage.getItem("ml"));

  useEffect(() => {
    // dispatch(getUsersById(user?.email?.toLowerCase()));
    if (favML && user?.email) {
      dispatch(addFavorite(favorites));
    }
    return () => {
      dispatch(clearUserDetail());
    };
  }, [dispatch]);

  function handleClick() {
    setShow(true);
  }
  let favorites = {
    userEmail: user?.email,
    medicalLicense: favML,
  };

  return (
    <div>
      {User.email && !User.active && navigate("/recover")}
      {User.email && User.deletedByAdmin && navigate("/deletedUser")}
      {User.rol === "admin" ? (
        <Dashboard user={user} />
      ) : User.email ? (
        <div>
          <Navbar user={user} />
          <div className="nuestracontainer">
            <div className="primercont">
              <div className="micontainerImage">
                <ImageUser image={User.userimage} />
              </div>
              <div className="micontainerInfo ">
                <InfoUser
                  name={User.name}
                  email={User.email}
                  country={User.country}
                  province={User.province}
                  city={User.city}
                  birthdate={User.dateOfBirth}
                />
              </div>
            </div>

            <div className="seconcont">
              <div className="medicalRecorder">
                <MedicalRecordUser userEmail={user.email} />
              </div>
              <div className="miHistoryApp">
                <Appointments
                  userEmail={user.email}
                  show={show}
                  name={User?.name}
                />
              </div>
              <div>{/* <HistoryAppointment /> */}</div>

              {/* <div className="miFavorites">
        <h1>Favoritos</h1>
        {User.favorites.length?.map((pro) => (
          <Favorites image={pro.user.userimage} />
          ))}
      </div> */}
            </div>
            <button onClick={handleClick}>ver tus turnos</button>

            {User.rol === "professional" ? (
              <ProfessionalAppointments
                medicalLicense={User.professional?.medicalLicense}
                show={show}
              />
            ) : null}

            <div className="misbotones">
              {/* boton crear anuncio momentaneamente esta aca */}
              {User.rol === "professional" && (
                <div>
                  <ModalCreateAdd user={user} />
                </div>
              )}

              <Link to={"/profile/" + User.email}>
                <Button variant="success" size="sm">
                  Editar Perfil
                </Button>
              </Link>

              <ModalUnsubscribe user={User} />
            </div>
            {User.rol === "professional" &&
              User.professional?.ads &&
              User.professional?.ads.map((e) => {
                return (
                  // Component to edit your AD.
                  <>
                    <h1 className="anuncioTitle">Tus Anuncios</h1>
                    <div className="adProfileContainer">
                      <div className="yourAd">
                        <div className="anuncioImage">
                          <img src={User.userimage}></img>
                        </div>

                        <div className="anuncioName">{User.name}</div>
                        <div className="anuncioEmail">{User.email}</div>
                        <div className="anuncioLicencia">
                          {User.professional.professionalMedicalLicense}
                        </div>
                        <div className="anuncioEspecialidad">{e.specialty}</div>
                        <div className="anuncioTipoServicio">
                          {e.serviceType}
                        </div>
                        <div className="anuncioPrecio">{User.price}</div>
                        <div className="anuncioRanking">
                          {User.professional.ranking}
                        </div>
                        <div className="anuncioLinkEdit">
                          <Link to={"/ProfileAd/" + e.id}>Edita Anuncio</Link>
                        </div>
                        <div className="createEditAppointment">
                        <Link to={`/calendar/` + e.id}>
                          <Button variant="primary" >Crea/Edita Turnos</Button>
                        </Link>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
