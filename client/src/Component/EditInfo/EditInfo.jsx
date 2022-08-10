import React from 'react'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUsersById, putEditInfoProfessional, putEditInfoUser, putEditInfoAdd} from '../../Redux-actions'
import {useParams} from 'react-router-dom'
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './EditInfo.css'


export default function EditInfo(props) {
 
 let {userId} =useParams();
 let dispatch = useDispatch();
 let User = useSelector(state=> state.userDetail)
 let [activo, setActivo] = useState(false)
 let [editUser , setEditUser] = useState({
    name: "",
    password: "",
    dateOfBirth: "",
    identification: "",
    userimage: "",
    idImage: "",
    country: "",
    city: "",
    address: "",
    province: "",
    phone: "",
    rol: "",
    gps: "",
    favorites :[]
  })


  function handleChange(e){
    e.preventDefault();
    setEditUser({
        ...editUser,
    [e.target.name] : e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    // dispatch(putEditInfoProfessional(editProfessional));
    dispatch(putEditInfoUser(editUser , userId));
    // dispatch(putEditInfoAdd(editAdd))
    setEditUser({
        name: "",
        password: "",
        dateOfBirth: "",
        identification: "",
        userimage: "",
        idImage: "",
        country: "",
        city: "",
        address: "",
        province: "",
        phone: "",
        rol: "",
        gps: "",
        favorites :[]
    })
  }
  console.log(editUser)

    useEffect(()=>{
    dispatch(getUsersById(userId));
 },[dispatch])


  return (
    <div>
    <Navbar/>
    <Form onSubmit={e=>handleSubmit(e)}>
    <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>Nombre: </Form.Label>
             <Form.Control 
               type="text"
               id="name"
               name="name"
               value={editUser.name}
               placeholder={User.name}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
            
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>Contraseña: </Form.Label>
             <Form.Control 
               type="text"
               id="password"
               name="password"
               value={editUser.password}
               placeholder={User.password}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label> Fecha de Nacimiento: </Form.Label>
             <Form.Control 
               type="text"
               id="dateOfBirth"
               name="dateOfBirth"
               value={editUser.dateOfBirth}
               placeholder={User.dateOfBirth}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>DNI: </Form.Label>
             <Form.Control 
               type="text"
               id="identification"
               name="identification"
               value={editUser.identification}
               placeholder={User.identification}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>Foto de Perfil: </Form.Label>
             <Form.Control 
               type="text"
               id="userimage"
               name="userimage"
               value={editUser.userimage}
               placeholder={User.userimage}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
              
   </div>
   <div>
  
             <Form.Group className="mb-3" >
             <Form.Label>Pais: </Form.Label>
             <Form.Control 
               type="text"
               id="country"
               name="country"
               value={editUser.country}
               placeholder={User.country}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
              
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>Ciudad: </Form.Label>
             <Form.Control 
               type="text"
               id="city"
               name="city"
               value={editUser.city}
               placeholder={User.city}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
              
   </div>
   <div>
  
             <Form.Group className="mb-3" >
             <Form.Label>Direccion: </Form.Label>
             <Form.Control 
               type="text"
               id="address"
               name="address"
               value={editUser.address}
               placeholder={User.address}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>Provincia: </Form.Label>
             <Form.Control 
               type="text"
               id="province"
               name="province"
               value={editUser.province}
               placeholder={User.province}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
              
   </div>
   <div>
   
             <Form.Group className="mb-3" >
             <Form.Label>Telefono: </Form.Label>
             <Form.Control 
               type="text"
               id="phone"
               name="phone"
               value={editUser.phone}
               placeholder={User.phone}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>
   <div>
 
             <Form.Group className="mb-3" >
             <Form.Label>Ubicacion GPS: </Form.Label>
             <Form.Control 
               type="text"
               id="gps"
               name="gps"
               value={editUser.gps}
               placeholder={User.gps}
               onChange={(e) => handleChange(e)}
               />
           </Form.Group>
               
   </div>
   <Button type="submit" >
              Modificar Datos
            </Button>
   </Form>



<Button>Cerrar la cuenta</Button>
<div className='hola'></div>
<Footer/>
    </div>
  )
}