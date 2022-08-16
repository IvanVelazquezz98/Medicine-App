import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionalById, getUsersById, putEditAppointment } from '../../Redux-actions';
import ModalPayment from '../Home/ModalPayment';
import ModalErrors from '../ModalsErrors/ErrorsRouta';

export default function ModalCalendar({info, professionalMedicalLicense,adId,name, ad}) {
  const [show, setShow] = useState(true);
  const [pay, setPay] = useState(false);
  const [validate, setValidate]= useState(false)
  const [CompleteRegister, setCompleteRegister]= useState(false)
  const userDetail = useSelector((state) => state.userDetail);
  const dispatch= useDispatch()
  const userEmail=localStorage.getItem("Email")
  useEffect(() => {
    dispatch(getUsersById(userEmail));
  }, [dispatch]);


 console.log('Modal',info)
 let idApp= info.id
 console.log('info.id', idApp)
 let date= info.start.getDate()
 let month= info.start.getMonth()
 let hr= info.start.getHours()
 let min= info.start.getMinutes()
 
    
 let Months=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'noviembre', 'diciembre']

 
//  console.log('soy dia', dia)
//  console.log('soy mes', mes)
//  console.log('soy hr', hr)
//  console.log('soy min', typeof min)
 
//userEmail



  const handleClose = () => setShow(false);
  const handleonclick = () => {
    if(userEmail===null){
     return setValidate(true)
    }
    // else if(!userDetail.rol || !userDetail.name || !userDetail.identification || !userDetail.idImage || !userDetail.country || !userDetail.city || !userDetail.address){
    //   return setCompleteRegister(true)
    // }
    setPay(true)
    dispatch(putEditAppointment({status:'booked', userEmail: userEmail},idApp))
  }
 
  const handleShow = () => setShow(true);
  const professionalProfile = useSelector((state)=>state.professionalProfile)
 
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
          {pay ? <ModalPayment info={idApp} adId={adId}name={name} ad={ad}/> : null}
          {validate? <ModalErrors error={'Por favor complete sus datos para poder solicitar un turno'} route={'/home/validate'} /> : null}
          

        </Modal.Footer>
      </Modal>
    </>
  );
}