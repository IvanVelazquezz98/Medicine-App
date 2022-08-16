import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function ModalErrors({error, route}) {
  const [show, setShow] = useState(true);
  let navigate = useNavigate()

  const handleClose = () =>{
    console.log('que me traes user Email', route)
    if(route){
      navigate(route)
    }
    setShow(false)};
  const handleShow = () => setShow(true);

  return (
    <>

      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton/>
   
        <Modal.Body>{error}</Modal.Body>

      </Modal>
    </>
  );
}