import React from "react";
import MedicalRecordUser from "./medicalRecordUser";
import ImageUser from "./imageProfile";
import Favorites from "./favoritesProfessionalUser";
import InfoUser from "./InfoUserProfile";
import HistoryAppointment from "./historyAppointmentUser";
import CreateAd from "../CreateAd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersById } from "../../Redux-actions/index.js";
import { Link } from "react-router-dom";
import './StyleProfile.css';

import firebaseApp from "../../Credential/index";
import { getAuth, signOut } from "firebase/auth";
import Navbar from '../Navbar/Navbar'

const UserProfile = ({ user }) => {
  const auth = getAuth(firebaseApp);
  const User = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();

  const [button, setButton] = React.useState(false);

  useEffect(() => {
    console.log(user.email);
    dispatch(getUsersById(user.email.toLowerCase()));
  }, [dispatch]);

  console.log(User);

  return (
    <div>
      <Navbar/>
    <div className="nuestracontainer">
      {/* Boton provisorio hasta que este la NAV BAR lleva a HOME */}
      
      <div className="primercont">

      <div className="micontainerImage">
        <ImageUser image={User.userimage} />
        <div className="miboton">
          <button  className="botonUser">Editar</button>
        </div>
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
        <MedicalRecordUser />
      </div>
      <div className="miHistoryApp">
        <HistoryAppointment />
      </div>
      {/* <div className="miFavorites">
        <h1>Favoritos</h1>
        {User.favorites.length?.map((pro) => (
          <Favorites image={pro.user.userimage} />
          ))}
      </div> */}
      </div>
      <div className="misbotones">

      {/* boton crear anuncio momentaneamente esta aca */}
      {User.rol === "professional" && <CreateAd user={user} />}

      <div className="SignOut">
      <button className="botonUser" onClick={() => signOut(auth)}>Cerrar sesion</button> 
      </div>

      </div>
      <div>
       {/*  <Footer/> */}
      </div>
    </div>
  </div>
  );
};

export default UserProfile;

// email,
//             password,
//             name,
//             dateOfBirth,
//             identification,
//             userimage,
//             idImage,
//             country,
//             city,
//             address,
//             cp,
//             phone,
//             rol,
//             gps
