import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import ContactoForm from '../Contacto/ContactoForm';
import Button from 'react-bootstrap/Button';
import { BsFacebook,BsLinkedin,BsInstagram } from "react-icons/bs";
import './Footer.css';
import FormScore from './FormScore'

function Footer() {
  const [show , setShow] = useState(false)
  const [userComments , setUserComments] = useState(null)
  

  useEffect(() => {
    userC()
  }, []);

  function userC (){
   
  var user = localStorage.getItem('Email');
   return setUserComments(user)
   
  }
  console.log('user', userComments)
  

  return (
    
        <footer className='FooterContainer'>

            <div className='contactoDiv'>
              <h4>Contacto</h4>
              <img src={logo} width={60}/>
              <ContactoForm/>
            </div>
            

            <div className='OpeningHoursDiv'>
            <h4>Contanos tu experiencia con Medicine App! </h4>
              <h6>Tu opinion nos ayuda a mejorar</h6>
                {userComments ? <Button onClick={(e) => setShow(true)} className='homeBtn' >
                    Puntuanos 😊 {show ? <FormScore userEmail={userComments}/> :null}
                </Button> : <Button>Registrate para puntuarnos</Button>}
            
            </div>


            <div className='subscribeMailingDiv'>
              <div className='rightMailingContainer'>

                <div className='mailingBox'>
                  <h4>Descubre Nuestras Redes</h4>

                </div>

                <div className='mailingBoxSearch'>
                  <h4>Para estar mas  cerca de nosotros </h4>
                </div>
                
                <div className='mailingBoxSearch'>
                  <p>Y enterarte de las ultimas novedades</p>
                  <div className='icons'>

                    <div className='FB'>
                      <BsFacebook />
                    </div>
                    <div className='LinkedIn'>
                      <BsLinkedin/>
                    </div>
                    <div className='IG'>
                      <BsInstagram/>
                    </div>
                  </div>
                </div>

              </div>
            </div>


        </footer>

  )
}

export default Footer