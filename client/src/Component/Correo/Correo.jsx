import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import emailjs from "@emailjs/browser";
import "./Correo.css";
import ModalCalendar from "../AppCalendario/Modal";
import {
  getAppointmentsById,
  getUsersById,
  getProfessionalById,
} from "../../Redux-actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./Correo.css";

function ContactoForm({ ad, info, medicalLicence, isProfesional }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  //const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userEmail = localStorage.getItem("Email");
  const appointmentInfo = useSelector((state) => state.appointmentInfo);
  const professionalProfile = useSelector((state) => state.professionalProfile);
  const userDetail = useSelector((state) => state.userDetail);
  const { idApp } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(getUsersById(userEmail));
    dispatch(getProfessionalById(medicalLicence));
    dispatch(getAppointmentsById(idApp));
  };

  //mail aqui
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5qp9enm",
        "template_yll5m9r",
        e.target,
        "jeekxUefyAsuBBz5j"
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    navigate("/");
  }

  //let fecha = {appointmentInfo.date[2]+'/'+ appointmentInfo.date[1]+'/' + appointmentInfo.date[0]}
  //mai = {userEmail}

  return (
    <>
      <h1 className="Payment-title">Su pago ha sido Procesado exitosamente</h1>
      {/* <Button onClick={handleShow} className="mainButton">
        recibir comproante al correo
      </Button> */}
      <Form onSubmit={(e) => sendEmail(e)}>
        <h1 className="Payment-title">Los datos de tu compra son:</h1>
        <p>Nombre</p>
        <input type="text" name="name" value={userDetail.name} />
        <p>Correo</p>
        <input type="text" name="email" value={userEmail} />
        <p>Especialidad</p>
        <input
          type="text"
          name="especialidad"
          value={appointmentInfo.ad.specialty}
        />
        <p>Monto</p>{" "}
        <input type="text" name="precio" value={appointmentInfo.ad.price} />
        <p>Fecha </p>
        <input
          type="text"
          name="fecha"
          value={
            appointmentInfo.date[2] +
            "/" +
            appointmentInfo.date[1] +
            "/" +
            appointmentInfo.date[0]
          }
        />
        <p>Hora</p>{" "}
        <input
          type="text"
          name="hora"
          value={
            appointmentInfo?.startTime[0] +
            ":" +
            appointmentInfo?.startTime[1] +
            "Hs"
          }
        />
        <p>Especialista</p>
        <input
          type="text"
          name="doctor"
          value={appointmentInfo?.professional.user.name}
        />
        <p>Correo del medico</p>{" "}
        <input
          type="text"
          name="medemail"
          value={appointmentInfo?.professional.user.email}
        />
        <p>Modalidad</p>{" "}
        <input
          type="text"
          name="modalidad"
          value={appointmentInfo?.ad.serviceType}
        />
        <div>
          {appointmentInfo?.ad.serviceType === "presencial" ? (
            <div>
              Direccion{" "}
              <input
                type="text"
                name="direccion"
                value={
                  appointmentInfo?.professional.user.country +
                  "-" +
                  appointmentInfo?.professional.user.province +
                  "-" +
                  appointmentInfo?.professional.user.city +
                  "-" +
                  appointmentInfo?.professional.user.address
                }
              />{" "}
            </div>
          ) : (
            <div>
              {" "}
              <p>Direccion</p>{" "}
              <input type="text" name="direccion" value="No corresponde" />
            </div>
          )}
        </div>
        <Button variant="success" type="submit">
          enviar
        </Button>
      </Form>
    </>
  );
}

export default ContactoForm;
