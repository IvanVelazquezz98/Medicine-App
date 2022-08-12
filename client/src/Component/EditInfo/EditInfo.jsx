import React from 'react'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUsersById, putEditInfoProfessional, putEditInfoUser} from '../../Redux-actions'
import {Link, useParams} from 'react-router-dom'
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './EditInfo.css'
import Ad from '../Card/Ad.jsx'


export default function EditInfo() {


 
 let {userId} =useParams();
 let dispatch = useDispatch();
 let User = useSelector(state=> state.userDetail)

 useEffect(()=>{
    dispatch(getUsersById(userId));
 },[dispatch])
 
 
 let [editUser , setEditUser] = useState({
    name: User.name,
    password: User.password,
    dateOfBirth: User.dateOfBirth,
    identification: User.identification,
    userimage: User.userimage,
    idImage: User.idImage,
    country: User.country,
    city: User.city,
    address: User.address,
    province: User.province,
    phone: User.phone,
    rol: User.rol,
    gps: User.gps,
  })

  let [editProfessional , setEditProfessional] = useState({
    aboutMe: User.professional?.aboutMe,
    college: User.professional?.college
  })



  function handleDisingageProfessional(e){
        e.preventDefault();
        setEditUser({
            ...editProfessional,
        rol : "usuario",
    })}

  function handleRegisterProfessional(e){
    e.preventDefault();
    setEditUser({
        ...editUser,
    rol : "professional",
})}

  function handleChangeUser(e){
    e.preventDefault();
    setEditUser({
        ...editUser,
    [e.target.name] : e.target.value
    })
  }

  function handleChangeProfessional(e){
    e.preventDefault();
    setEditProfessional({
        ...editProfessional,
    [e.target.name] : e.target.value
    })
  }


  function handleSubmit(e){
    e.preventDefault();
    dispatch(putEditInfoProfessional(editProfessional, User.professional.medicalLicense));
    dispatch(putEditInfoUser(editUser , userId));
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
    })
    setEditUser({
        aboutMe: "",
        college: "",
    })
  }
  


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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
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
               onChange={(e) => handleChangeUser(e)}
               />
           </Form.Group>
               
   </div>
   {(User.rol == "professional") &&
   <div >
   <Button onClick={e=>handleDisingageProfessional(e)}>Dejar de brindar mis servicios de Profesional</Button>
   </div>
   }

   {(User.rol === "usuario") &&
   <div>
   <Button onClick={e=>handleRegisterProfessional(e) }>registrarme como profesional de la salud</Button>
   </div>
   }
    {(User.rol == "professional") &&
    

    <div>
   
    <Form.Group className="mb-3" >
    <Form.Label>Sobre Mi: </Form.Label>
    <Form.Control 
      type="text"
      id="aboutMe"
      name="aboutMe"
      value={editProfessional.aboutMe}
      placeholder={User.professional.aboutMe ? User.professional.aboutMe : "complete"}
      onChange={(e) => handleChangeProfessional(e)}
      />
  </Form.Group>

  <div>
   
   <Form.Group className="mb-3" >
   <Form.Label>Estudios: </Form.Label>
   <Form.Control 
     type="text"
     id="college"
     name="college"
     value={editProfessional.college}
     placeholder={User.professional.college ? User.professional.college : "complete"}
     onChange={(e) => handleChangeProfessional(e)}
     />
 </Form.Group>
    
</div>  
</div>
  
    }
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