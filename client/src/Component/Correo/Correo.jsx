import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import emailjs from "@emailjs/browser";
import "./Correo.css";
import ModalCalendar from "../AppCalendario/Modal";

function ContactoForm({ professionalMedicalLicense, name, ad, isProfesional }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <>
      <Button onClick={handleShow} className="mainButton">
        Confirmacion de Compra
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Datos de Compra</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => sendEmail(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="nombre@ejemplo.com"
                autoFocus
              />
              <ModalCalendar
                
              />
              <Form.Label>Nombre </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="name"
                autoFocus
              />
              <Form.Label>Doctor </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="doctor"
                autoFocus
              />

              <Form.Label>Especialidad </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="especialidad"
                autoFocus
              />
              <Form.Label>Modalidad </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="modalidad"
                autoFocus
              />
              <Form.Label>Precio </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="precio"
                autoFocus
              />
              <Form.Label>Fecha </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="fecha"
                autoFocus
              />
              <Form.Label>Hora </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre aquí..."
                name="hora"
                autoFocus
              />
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
      </Modal>
    </>
  );
}

export default ContactoForm;
