import React from 'react'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUsersById} from '../../Redux-actions'
import {useParams} from 'react-router-dom'
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'
import { Button } from 'react-bootstrap';


export default function EditInfo(props) {
 
 let {userId} =useParams();
 let dispatch = useDispatch();
 let User = useSelector(state=> state.userDetail)
 let [activo, setActivo] = useState(false)
 
    useEffect(()=>{
    dispatch(getUsersById(userId));
 },[dispatch])

 

 function handleEditar(e){
    e.preventDefault();
    if(!activo){setActivo(true)}
    else{setActivo(false)}
 }

  return (
    <div>
    <Navbar/>
    <div>
   <h5>nombre : {User.name}  </h5>
   <button onClick ={e=>handleEditar(e)}>editar</button>
   {activo && 
   <form>edita acá</form>}
   </div>

   <h5>email : {User.email}</h5>
   <h5>contraseña :{User.password}</h5>
   <h5>fecha de nacimiento : {User.dateOfBirth}</h5>
   <h5>dni : {User.identification}</h5>
   <h5>foto de perfil :{User.userImage}</h5>
   <h5>pais : {User.country}</h5>
   <h5>ciudad : {User.city}</h5>
   <h5>direccion : {User.adress}</h5>
   <h5>provincia : {User.province}</h5>
   <h5>telefono : {User.phone}</h5>
   <h5>ubicacion en gps : {User.gps}</h5>
   


<Button>Cerrar la cuenta</Button>

<Footer/>
    </div>
  )
}