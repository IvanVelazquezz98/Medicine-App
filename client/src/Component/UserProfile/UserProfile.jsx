import React from "react";
import MedicalRecordUser from "./medicalRecordUser";
import ImageUser from "./imageProfile";
import Favorites from "./favoritesProfessionalUser";
import InfoUser from "./InfoUserProfile";
import HistoryAppointment from "./historyAppointmentUser";
import ModalUnsubscribe from "../Unsubscribe/ModalUnsubscribe";
import CreateAd from "../CreateAd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addFavorite, getUsersById } from "../../Redux-actions/index.js";
import { Link } from "react-router-dom";
import './StyleProfile.css';
import Ad from "../Card/Ad";
import AppCalendario from '../AppCalendario/AppCalendario.jsx'
import firebaseApp from "../../Credential/index";
import { getAuth, signOut } from "firebase/auth";
import Navbar from '../Navbar/Navbar'
import CreateAppointments from "../CreateAppointments/CreateAppointments";
import Login from "../Login/Login";
import Footer from '../Footer/Footer'
import ModalCreateAdd from "../CreateAd/Modal";
import { useNavigate } from "react-router-dom";
import Appointments from "./Apointments";


const UserProfile = ({ user }) => {
  const auth = getAuth(firebaseApp);
  const User = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [button, setButton] = useState(false);

  useEffect(() => {
    dispatch(getUsersById(user?.email?.toLowerCase()));
    if (favML && user?.email) {
      dispatch(addFavorite(favorites))

    }
  }, [dispatch]);




  let favML = JSON.parse(localStorage.getItem("ml"));


  let favorites = {
    userEmail: user?.email,
    medicalLicense: favML
  }




  return (
    <div>
      {User.email && !User.active &&
        navigate("/recover")
      }

      {User.email ?
        <div>
          <Navbar user={user} />
          <div className="nuestracontainer">
            {/* Boton provisorio hasta que este la NAV BAR lleva a HOME */}

            <div className="primercont">

              <div className="micontainerImage">
                <ImageUser image={User.userimage} />
                <div >
                <Link to={"/profile/" + User.email}>
                  editar informacion de perfil
                </Link>
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
              <div>
                <ModalUnsubscribe user={User} />
              </div>
              {/* boton crear anuncio momentaneamente esta aca */}
              {User.rol === "professional" &&
                <div>
                  <ModalCreateAdd user={user} />

                  {/* <CreateAppointments user={user} /> */}
                  {/* <AppCalendario professionalMedicalLicense={User.professional.medicalLicense}/> */}
                </div>}


            </div>
           { User.rol === "usuario" &&
           <>
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
            <div >
                <Appointments user={User} />
              </div>
              </>
              }
            <div className="misbotones">
              

              


              {/* <div className="SignOut">
      <button className="botonUser" onClick={() => signOut(auth)}>Cerrar sesion</button>  */}
              
              {/* </div> */}
              
              <div className="conteinerads">

              <h1>Tus Anuncios</h1>
              
              <div className="adsprofile">
              {(User.rol === "professional") && (User.professional?.ads) &&

                User.professional?.ads.map((e) => {
                  return (
                    <div>
                      
                      <Ad
                        adID={e.id}
                        name={User.name}
                        email={User.email}
                        medicalLicense={User.professional.medicalLicense}
                        especialidad={e.specialty}
                        serviceType={e.serviceType}
                        precio={User.price}
                        ranking={User.professional.ranking}
                        isProfesional={true} />
                      <Link to={"/ProfileAd/" + e.id}>edita tu anuncio</Link>

                    </div>
                    

                  )
                })}
              </div>
              </div>

            </div>
            <div>
              {/*  <Footer/> */}
            </div>
          </div>
        </div>

        :

        <div> <Navbar /> <div ><Login /> </div><div className='space'> <Footer /></div></div>}
    </div>
  );
};

export default UserProfile;

