import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionalById } from '../../Redux-actions';
import ModalPayment from '../Home/ModalPayment';

export default function ModalCalendar({info, professionalMedicalLicense}) {
  const [show, setShow] = useState(true);
  const [pay, setPay] = useState(false);
 console.log('Modal',info)
 let date= info.start.getDate()
 let month= info.start.getMonth()
 let hr= info.start.getHours()
 let min= info.start.getMinutes()
 
    
 let Months=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'noviembre', 'diciembre']

 
//  console.log('soy dia', dia)
//  console.log('soy mes', mes)
//  console.log('soy hr', hr)
 console.log('soy min', typeof min)
 

  const handleClose = () => setShow(false);
  const handleonclick = () => setPay(true)
 
  const handleShow = () => setShow(true);
  const professionalProfile = useSelector((state)=>state.professionalProfile)
  const dispatch= useDispatch()
     useEffect(()=>{
    dispatch(getProfessionalById(professionalMedicalLicense))
},[dispatch])

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Su turno sería con:
            {professionalProfile.user?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>el día: {date} de {Months[month].toUpperCase()}</p>
            <p> a la hora: {hr}:{min=== 0? min='00': min} </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleonclick}>
            Confirmar
          </Button>
          {pay ? <ModalPayment/> : null}

        </Modal.Footer>
      </Modal>
    </>
  );
}