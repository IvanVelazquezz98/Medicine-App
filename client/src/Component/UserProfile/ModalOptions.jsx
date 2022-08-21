import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import ModalAbsent from './ModalAbsent'
import ModalCancelPro from './ModalCancelPro';

export default function ModalOptions({ appointment }) {
    const [show, setShow] = useState(true);
    const [cancel , setCancel] = useState(false);
    const [absent , setAbsent] = useState(false);
    const [readyApp , setReacdyApp] = useState(false);

    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
    };

    const handleCancelAppointment = () => {
        setCancel(true)
    }

    const hanldeReadytowork = () => {
        
    }

    const handleAbsentPatient = () => {
        setAbsent(true)
    }


    return (
        <>
            {absent ? <ModalAbsent idApp={appointment.row?.id} /> : null}
            {cancel ? <ModalCancelPro idApp={appointment.row?.id}/> : null }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Opciones del turno {appointment.row?.id}
                    </Modal.Title>
                </Modal.Header>
                -Con el paciente : {appointment.row?.paciente}
                <br></br>
                -El dia : {appointment.row?.fecha}
                <br></br> 
                -A la hora : {appointment.row?.hora}
                <Modal.Footer>
                    <Button variant="secondary" onClick={hanldeReadytowork}>
                        Empezar consulta
                    </Button>
                    <Button variant="secondary" onClick={handleAbsentPatient}>
                        Paciente Ausente
                    </Button>
                    <Button variant="secondary" onClick={handleCancelAppointment}>
                        Cancelar este turno
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}