import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putEditAppointment } from '../../Redux-actions';
import { useDispatch } from 'react-redux';

export default function ModalCancelPro({ idApp }) {
    const [show, setShow] = useState(true);

    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
    };

    const handleCancel = () => {
        dispatch(putEditAppointment({ status: 'cancelled' }, idApp))
        setShow(false)
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dar por cancelado este turno
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