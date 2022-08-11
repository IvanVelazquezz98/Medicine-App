import React from 'react';
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'
import {useParams} from 'react-router-dom'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {getAdById, putEditInfoAd} from '../../Redux-actions'
import Form from 'react-bootstrap/Form';

export default function EditAd() {
 
    let {AdId} =useParams();
    let dispatch = useDispatch();
    let Ad = useSelector(state=> state.adDetail)
    
   
    useEffect(()=>{
       dispatch(getAdById(AdId));
    },[dispatch])

    let [editAd , setEditAd] = useState({
        specialty: Ad.specialty,
        price: Ad.price,
        timeAvailability: Ad.timeAvailability,
        serviceType: Ad.serviceType,
    })

    function handleChange(e){
        e.preventDefault();
        setEditAd({
            ...editAd,
        [e.target.name] : e.target.value
        })
      }

      function handleSubmit(e){
        e.preventDefault();
        dispatch(putEditInfoAd(editAd , AdId));
        setEditAd({
            specialty: "",
            price: "",
            timeAvailability: "",
            serviceType: "",
        })
      }



    return (

      <div>
        <Navbar/>

        <Form onSubmit={e=>handleSubmit(e)}>
    <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>especialidad: </Form.Label>
             <Form.Control 
               type="text"
               id="specialty"
               name="specialty"
               value={editAd.specialty}
               placeholder={Ad.specialty}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
            
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>precio: </Form.Label>
             <Form.Control 
               type="text"
               id="price"
               name="price"
               value={editAd.price}
               placeholder={Ad.price}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label> turnos disponibles: </Form.Label>
             <Form.Control 
               type="text"
               id="timeAvailability"
               name="timeAvailability"
               value={editAd.timeAvailability}
               placeholder={Ad.timeAvailability}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>tipo de servicio: </Form.Label>
             <Form.Control 
               type="text"
               id="serviceType"
               name="serviceType"
               value={editAd.serviceType}
               placeholder={Ad.serviceType}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>

<Button type='Submit'>Editar Anuncio</Button>
   </Form>

       <Footer/>
      </div>
  
  );
}