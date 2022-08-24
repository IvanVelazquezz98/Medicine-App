import React, { useState, } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import emailjs from "@emailjs/browser";
import "./Correo.css";
import ModalCalendar from "../AppCalendario/Modal";
import { getAppointmentsById,
  getUsersById,
  getProfessionalById} from "../../Redux-actions";
  import { useDispatch, useSelector } from "react-redux";

function ContactoForm({ user, adId, name, ad,info,medicalLicence,isProfesional}) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  //const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userEmail = localStorage.getItem("Email");
  const appointmentInfo = useSelector((state) => state.appointmentInfo);
  const professionalProfile = useSelector((state) => state.professionalProfile);
  const userDetail = useSelector((state) => state.userDetail);
  
  

  const handleClose = () =>{
    dispatch(getUsersById(userEmail));
    dispatch(getProfessionalById(medicalLicence));
    dispatch(getAppointmentsById(info));
  } ;

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
  }
  console.log(appointmentInfo.startTime, "hora")
  console.log(appointmentInfo.date, "fecha")
  console.log(appointmentInfo.ad.specialty, "especialidad")
  console.log(appointmentInfo.ad.price, "precio")
  console.log(professionalProfile,"nombre del medico")
  console.log(userEmail, 'prof')
  console.log(userDetail.name, 'profesional')
  console.log(ad,'uno mas')
  //let fecha = {appointmentInfo.date[2]+'/'+ appointmentInfo.date[1]+'/' + appointmentInfo.date[0]}
  //mai = {userEmail}
  
  return (
    <>
    <h1>Su pago ha sido Procesado exitosamente</h1>
      {/* <Button onClick={handleShow} className="mainButton">
        recibir comproante al correo
      </Button> */}
<form onSubmit={(e) => sendEmail(e)}>
  <h1>Hola</h1>
  <input type="text" name="name" value={userDetail.name} />
<h1>Los datos de tu compra son:</h1>
       <p>Correo</p><input type="text"  name="email" value={userEmail}  />
      <p>Especialidad</p><input type="text"  name="especialidad" value= {appointmentInfo.ad.specialty} />
     <p>Monto</p> <input type="text" name="precio" value= {appointmentInfo.ad.price} />
    <p>Fecha </p><input type="text"  name="fecha" value=  {appointmentInfo.date[2]+'/'+ appointmentInfo.date[1]+'/' + appointmentInfo.date[0]} />
     <p>Hora</p> <input type="text" name="hora" value= {appointmentInfo?.startTime[0] + ':' + appointmentInfo?.startTime[1] + 'Hs'} />

     <Button variant="success" type="submit">
                enviar
              </Button>
   
</form>
      

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Datos de Compra</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => sendEmail(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email </Form.Label>
              <div>{userEmail}</div>
              <ModalCalendar
                
              />
              <Form.Label>Nombre </Form.Label>
              <div>{userDetail.name}</div>

              <Form.Label>Doctor </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="doctor"
                autoFocus
              />

              <Form.Label>Especialidad </Form.Label>
              <div>{appointmentInfo.ad.specialty}</div>

              <Form.Label>Modalidad </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="modalidad"
                autoFocus
              />
              <Form.Label>Precio </Form.Label>
              <div>{appointmentInfo.ad.price}</div>

              <Form.Label>Fecha </Form.Label>
              <div>{appointmentInfo.date}</div>

              <Form.Label>Hora </Form.Label>
              <div>{appointmentInfo.startTime}</div>

            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Escribí tu consulta.</Form.Label>
              <Form.Control as="textarea" rows={3} name="message" />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleClose} type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </>
  );
}

export default ContactoForm;
