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

import ProfessionalAppointments from "./ProfessionalAppointments";
import MedicalRecordUser from "./MedicalRecordUser";
import PatientHistory from "./PatientHistory";
import AppointmentsPendinUser from "./AppointmentsPendinUser"; 
import { Button } from "react-bootstrap";
import "./editAdContainer.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import ProfessionalAvailable from "./ProfessionalAvailable";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../Admin/Chart';
import Users from '../Admin/Users'
import Profesionals from '../Admin/Profesionals'
import AllUsers from "../Admin/allUsers";

const UserProfile = () => {
  const auth = getAuth(firebaseApp);
  const User = useSelector((state) => state.userDetail);
  const user = useSelector((state) => state.userValidated);
  console.log('userProfile', user)
  
const dispatch = useDispatch();
const navigate = useNavigate();

  const [button, setButton] = useState(false);
  const [show, setShow] = useState(false);
  const [drawer, setDrawer]= useState('MI PERFIL')
  const [sidebar, setSidebar]=useState(false)
  const handleClose = () => setSidebar(false);
  const handleShow = () => setSidebar(true);
  let favML = JSON.parse(localStorage.getItem("ml"));

  useEffect(() => {
    dispatch(getUsersById(user?.email?.toLowerCase()));
    if (favML && user?.email) {
      dispatch(addFavorite(favorites));
    }
    return () => {
      dispatch(clearUserDetail());
    };
  }, [dispatch]);

  let botonesProf = ['MI PERFIL','FAVORITOS','MIS TURNOS PENDIENTES','HISTORIAL DE ATENCION','MI HISTORIA CLINICA','TURNOS DISPONIBLES','PACIENTES PENDIENTES DE ATENCION','HISTORIAL DE PACIENTES','MIS ANUNCIOS','MIS RENDIMIENTOS']
  let botonesUser = ['MI PERFIL','FAVORITOS','MIS TURNOS PENDIENTES','HISTORIAL DE ATENCION','MI HISTORIA CLINICA']
  let botonesAdmin = ['MI PERFIL','USUARIOS', 'REDIMIENTO ANUAL' , 'USUARIOS TOP', 'PROFESIONALES TOP']
  function handleClick(e) {
    setDrawer(e.target.value);
  }
  let favorites = {
    userEmail: user?.email,
    medicalLicense: favML,
  };
 console.log(User.professional?.ads)
  return (
    <div>   
      {User.email && !User.active && navigate("/recover")}
      {User.email && User.deletedByAdmin && navigate("/deletedUser")}
      
          <Navbar user={user} />
          <div className="buttonContainer">
            <Button  className="FilterButton" onClick={handleShow}>
              Ver Menu
            </Button>
          </div>
          <Offcanvas className="OffMainContainer" show={sidebar} onHide={handleClose}>
            <Offcanvas.Header  closeButton>
              <Offcanvas.Title className="offTitle">que gran dia {User?.name}!</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>

              <div className="sidebar">
                {User.rol==='professional'?botonesProf.map(btn=><div className="orderPrice"><Button value={btn} onClick={handleClick}>{btn}</Button></div>):
                User.rol === 'admin'?botonesAdmin.map(btn=><div className="orderPrice"><Button value={btn} onClick={handleClick}>{btn}</Button></div>):
                botonesUser.map(btn=><div className="orderPrice"><Button value={btn} onClick={handleClick}>{btn}</Button></div>)} 
              </div>

            </Offcanvas.Body>
            </Offcanvas>
          <div>
            {drawer==='REDIMIENTO ANUAL'?
             <Container>
             
          
 
               <Grid item xs={12} md={8} lg={9}>
                 <Paper
                   sx={{
                     p: 2,
                     display: 'flex',
                     flexDirection: 'column',
                     height: 240,
                   }}
                 >
                   <Chart />
                 </Paper>
               </Grid>
               </Container>:
               drawer==='USUARIOS TOP'?
               <Users/>
               : drawer==='PROFESIONALES TOP'?
               <Profesionals/>
               :drawer==='USUARIOS'?
               <AllUsers/>:null
            }
            {drawer === 'MI PERFIL'?
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
            <div className="misbotones">
              
              <Link to={"/profile/" + User.email}>
                <Button variant="success" size="sm">
                  Editar Perfil
                </Button>
              </Link>

              <ModalUnsubscribe user={User} />
            </div>
          </div>:
          (drawer === 'FAVORITOS')?
          <div className="miFavorites">
        <h1>Favoritos poner la logica</h1>
        {/* {User.favorites?.length?.map((pro) => (
          <Favorites image={pro.user.userimage} />
          ))} */}
      </div>:
      (drawer === 'MIS TURNOS PENDIENTES')?
        <div className="miHistoryApp">
          <AppointmentsPendinUser userEmail={user?.email} name={User?.name}/>
        </div>:
      (drawer === 'HISTORIAL DE ATENCION')?
        <div className="miHistoryApp">
          <Appointments
            userEmail={user.email}
            show={show}
            name={User?.name}
          />
        </div>:
      (drawer === 'MI HISTORIA CLINICA')?   
        <div className="medicalRecorder">
          <MedicalRecordUser userEmail={user.email} />
        </div>:
      (drawer === 'PACIENTES PENDIENTES DE ATENCION')?
      <div className="miadminApp">
        <ProfessionalAppointments
                  medicalLicense={User.professional?.medicalLicense}
                  show={show}
                />
      </div> :
      (drawer === 'HISTORIAL DE PACIENTES')?
      <div className="medicalRecorder">
        <PatientHistory medicalLicense={User.professional?.medicalLicense} />
      </div>:
      (drawer === 'MIS ANUNCIOS')?  
      
      <div className="anunciosContainer">
        <h2 className="anuncioTitle">Tus Anuncios</h2>
              <div>
                <ModalCreateAdd user={user} />
              </div>
      {User.professional?.ads.length >0 ? User.professional?.ads.map((e) => {
        return (
          // Component to edit your AD.
          <div className="misAnunciosContainer">
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
          </div>
          
        );
      }): <div>
            <ModalCreateAdd user={user} />
          </div>}
      </div>:
      (drawer === 'MIS RENDIMIENTOS')?
      <p>grafico de esme</p>:
      (drawer === 'TURNOS DISPONIBLES')?
      <div className="medicalRecorder">
      <ProfessionalAvailable medicalLicense={User.professional?.medicalLicense} userEmail={user?.email} name={User?.name}/>
    </div>:
      null}
   </div>      
  </div>      
  );
};

export default UserProfile;