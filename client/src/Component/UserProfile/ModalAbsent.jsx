import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putEditAppointment } from '../../Redux-actions';
import { useDispatch } from 'react-redux';

export default function ModalAbsent({ idApp }) {
    const [show, setShow] = useState(true);

    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
    };

    const handleCancel = () => {
        dispatch(putEditAppointment({ status: 'absent' }, idApp))
        setShow(false)
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dar por ausente al paciente
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleCancel}>
                        Ausente
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}