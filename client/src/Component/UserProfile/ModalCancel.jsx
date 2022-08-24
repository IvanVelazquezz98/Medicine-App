import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createCancellAppointmentsByUser, putEditAppointment, modalProfessionalApps } from '../../Redux-actions';
import { useDispatch } from 'react-redux';

export default function ModalCancel({ idApp, userEmail, name }) {
  const [show, setShow] = useState(true);

  const dispatch = useDispatch()

  const handleClose = () => {
    setShow(false)
    dispatch(modalProfessionalApps(false))
  };

  const handleCancel = () => {
    // dispatch(createCancellAppointmentsByUser(input))
    
    setShow(false)
    dispatch(modalProfessionalApps(false))
    dispatch(putEditAppointment({ status: 'cancelled', userEmail: userEmail }, idApp))
    dispatch(createCancellAppointmentsByUser(idApp))
    window.location.reload()
  }


  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {name} Queres cancelar este turno?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            Cancelar este turno
          </Button>
        </Modal.Footer>

      </Modal>

    </>
  );
}