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
import Navbar from '../Navbar/Navbar'

import firebaseApp from "../../Credential/index";
import { getAuth, signOut } from "firebase/auth";

const UserProfile = ({ user }) => {
  const auth = getAuth(firebaseApp);
  const User = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();

  const [button, setButton] = React.useState(false);

  useEffect(() => {
    console.log(user.email);
    dispatch(getUsersById(user.email));
  }, [dispatch]);

  console.log(User);

  return (
    <div>
      <Navbar />
      {/* Boton provisorio hasta que este la NAV BAR lleva a HOME */}
      <Link to = '/'>
        <button> Home</button> 
      </Link>
      <ImageUser image={User.userimage} />

      <InfoUser
        name={User.name}
        email={User.email}
        country={User.country}
        province={User.province}
        city={User.city}
        birthdate={User.dateOfBirth}
      />
      <MedicalRecordUser />
      <HistoryAppointment />
      <div>
        {User.favorites?.map((pro) => (
          <Favorites image={pro.userimage} />
        ))}
      </div>

      {/* boton crear anuncio momentaneamente esta aca */}
      {User.rol === "professional" && <CreateAd user={user} />}
        <button onClick={() => signOut(auth)}>Cerrar session</button> <br />
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
