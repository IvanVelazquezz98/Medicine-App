import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createCancellAppointmentsByUser, putEditAppointment } from '../../Redux-actions';
import { useDispatch } from 'react-redux';
import ModalAbsent from './ModalAbsent'
import ModalCancel from './ModalCancel';

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
        setAbsent(true)
    }

    const handleAbsentPatient = () => {

    }


    return (
        <>
            {absent ? <ModalAbsent paciente={appointment.row?.paciente} idApp={appointment.row?.id} /> : null}
            {cancel ? <ModalCancel /> : null }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Opciones del turno {appointment.row?.id}
                    </Modal.Title>
                </Modal.Header>
                -Con el paciente : {appointment.row?.paciente}
                {/* -El dia : {appointment.row?.fecha} */}
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