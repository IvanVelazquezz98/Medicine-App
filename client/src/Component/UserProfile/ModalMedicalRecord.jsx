import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';

export default function ModalMedicalRecord({ info }) {
    const [show, setShow] = useState(true);

    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
    };

    const handleCancel = () => {
        
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Historia Clinica
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    );
}