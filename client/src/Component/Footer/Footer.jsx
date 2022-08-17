import React from 'react'
import logo from '../../assets/logo.png'
import ContactoForm from '../Contacto/ContactoForm';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { BsFacebook,BsLinkedin,BsInstagram } from "react-icons/bs";
import './Footer.css';


function Footer() {


  return (
    
        <footer className='FooterContainer'>

            <div className='contactoDiv'>
              <h4>Contacto</h4>
              <img src={logo} width={60}/>
              <ContactoForm/>
            </div>
            

            <div className='OpeningHoursDiv'>
            <h4>Contanos tu experiencia con AYDOC! </h4>
              <h6>Tu opinion nos ayuda a mejorar</h6>
              <Link to='/'>
                <Button  className='homeBtn' >
                    Home
                </Button>
              </Link>
            </div>


            <div className='subscribeMailingDiv'>
              <div className='rightMailingContainer'>

                <div className='mailingBox'>
                  <h4>Subscribe to join our Mailing List</h4>

                </div>

                <div className='mailingBoxSearch'>
                  <h4>Aca puede ir una search bar</h4>
                </div>
                
                <div className='socialMediaBox'>
                  <p>Nuestra redes.</p>
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