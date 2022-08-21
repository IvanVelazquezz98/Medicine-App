import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { putEditAppointment } from '../../Redux-actions'

export default function ModalAbsent({ paciente, idApp }) {
  const [show, setShow] = useState(true);

  const dispatch = useDispatch()

  const handleClose = () => {
    setShow(false)
  };


  const handleAbsent = () => {

    let payload = {
      status: 'absent'
    }
    let id = idApp
    dispatch(putEditAppointment(payload, id))
    setShow(false)
  }


  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Ausente
          </Modal.Title>
        </Modal.Header>
        Quiere marcar que el paciente : {paciente} se ausento?
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAbsent()}>
            Ausente
          </Button>
        </Modal.Footer>

      </Modal>

    </>
  );
}