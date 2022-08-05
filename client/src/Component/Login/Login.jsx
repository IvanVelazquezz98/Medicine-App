import React, { useState } from "react";
import firebaseApp from "../../Credential/index";
import { useDispatch, useSelector } from "react-redux"
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import { postUser ,postProfessional } from '../../Redux-actions/index'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'

const auth = getAuth(firebaseApp);


function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  const [postprofessional, setpostprofessional] = useState({
    medicalLicense: "",
    licenceImage: "",
    userEmail: ""
  })


  
//*****************************esto va en otro componente********************** */
  //reset password  PASAR LOGICA AL MODAL OLVIDO CONTRASEÑA
  const resetPassword = (email) => sendPasswordResetEmail(auth, email)
  const handleRessetPassword = async  () =>{
    try {
      await resetPassword(post.email)
      //crear MODAL con correo electronico y send
      return alert("Enviamos un correo para reestablecer tu contraseña")
    } catch (error) {
      console.log(error)
    }
  }
//********************************** */
  const [post, setPost] = useState({
    name: "",
    email: "",
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
    gps: ""
  })

  function handleChange(e) {
    e.preventDefault();
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
    setpostprofessional({
      ...postprofessional,
      [e.target.name]: e.target.value,
       userEmail : post.email
    })

  }


  // registrar usuario
  async function userRegister(email, password, rol) {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => {
      return userFirebase;
    });
    console.log(userInfo.user.uid)
    const docuRef = doc(firestore, `user/${userInfo.user.uid}`);
    setDoc(docuRef, { email: email, rol: rol });
  }

  
  function handleSubmit(e) {
    e.preventDefault();

    // const eemail = e.target.elements.email.value;
    // const password = e.target.elements.password.value;
    // const rol = e.target.elements.rol.value;

    // if (isRegister) {
    //   userRegister(eemail, password, rol)
    // } else if(!isRegister) {
    //   signInWithEmailAndPassword(auth, eemail, password)
    // } else {

    let user = {
      name: post.name,
      email: post.email,
      password: post.password,
      dateOfBirth: post.dateOfBirth,
      identification: post.identification,
      userimage: post.userimage,
      idImage: post.idImage,
      country: post.country,
      city: post.city,
      address: post.address,
      province: post.province,
      phone: post.phone,
      rol: post.rol,
      gps: post.gps
    }
    let professional ={
      medicalLicense: postprofessional.medicalLicense,
      licenceImage: postprofessional.licenceImage,
      userEmail: postprofessional.userEmail

    }
    dispatch(postUser(user))
    if(post.rol === "professional"){
    dispatch(postProfessional(professional))}
    alert("User Created")
    setPost({
      name: "",
      email: "",
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
      gps: ""
    })
  
  



    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;
    var rol = e.target.elements.rol.value;

     if (isRegister) {
     userRegister(email, password, rol)
     } else {
       signInWithEmailAndPassword(auth, email, password)
     }
  }

  return (
    <div className="ValidateCOntainer">


    
    <div className="Validate">
      <h2> {isRegister ? "Registrate" : "Inicia Sesión"} </h2>
      <Form onSubmit={handleSubmit} className="formContainer mb-2" >
      {/* mail */}
      <Form.Group className="mb-3" >
        <Form.Label>Correo: </Form.Label>
        <Form.Control 
          type="email" 
          id="email" 
          name="email" 
          value={post.email} 
          onChange={(e) => handleChange(e)} 
        />
      </Form.Group>
      {/* password */}
      <Form.Group className="mb-3" >
        <Form.Label>Password: </Form.Label>
        <Form.Control 
          type="password" 
          id="password" 
          name="password" 
          value={post.password} 
          onChange={(e) => handleChange(e)} 
        />
      </Form.Group>
      {
        isRegister &&
        <>
        {/* name */}
        <Form.Group className="mb-3" >
          <Form.Label>Nombre: </Form.Label>
          <Form.Control 
            type="text" 
            value={post.name} 
            name="name" 
            onChange={(e) => handleChange(e)}
            />
        </Form.Group>

        {/* rol */}
        <Form.Group className="mb-3" >
          <Form.Label>Rol: </Form.Label>
          <Form.Select id= "rol" name="rol" onChange={(e) => handleChange(e)}>
            
            <option value="1">...</option>
            <option value="user">Usuario</option>
            <option value="professional">Profesional</option>
          </Form.Select>
        </Form.Group>

          {/* fecha de nacimiento */}
          <Form.Group className="mb-3" >
            <Form.Label>Fecha de nacimiento: </Form.Label>
            <Form.Control 
              type="date" 
              value={post.dateOfBirth} 
              name="dateOfBirth" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Identificación: </Form.Label>
            <Form.Control 
              type="text" 
              value={post.identification} 
              name="identification" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>
          
          {/* Imagen usuario */}
          <Form.Group className="mb-3" >
            <Form.Label>Imagen Usuario: </Form.Label>
            <Form.Control 
              type="text" 
              value={post.idImage} 
              name="idImage" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>
          

            {/* Pais */}
          <Form.Group className="mb-3" >
            <Form.Label>Pais: </Form.Label>
            <Form.Control 
              type="text" 
              value={post.country} 
              name="country" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>

          {/* Ciudad  */}
          <Form.Group className="mb-3" >
            <Form.Label>Ciudad: </Form.Label>
            <Form.Control 
              type="text" 
              value={post.city} 
              name="city" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>

           {/*  codigo postal */}
           <Form.Group className="mb-3" >
            <Form.Label>Codigo Postal: </Form.Label>
            <Form.Control 
              type="text" 
              value={post.cp} 
              name="cp" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>

          {/*  Telefono */}
          <Form.Group className="mb-3" >
            <Form.Label>Telefono: </Form.Label>
            <Form.Control 
              type="text" 
              value={post.phone} 
              name="phone" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>

          {/*  Ubicacion GPS */}
          <Form.Group className="mb-3" >
            <Form.Label>Ubicacion GPS: </Form.Label>
            <Form.Control 
              type="text" 
              value={post.gps} 
              name="gps" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>

           {/*  Ubicacion GPS */}
           <Form.Group className="mb-3" >
            <Form.Label>Ubicacion GPS: </Form.Label>
            <Form.Control 
              type="text" 
              value={post.gps} 
              name="gps" 
              onChange={(e) => handleChange(e)}
              />
          </Form.Group>



          {
            //we check whether or not he/she is a professional 
            (post.rol === "professional") &&
            <>
              {/* Licencia Medica  */}
              <Form.Group className="mb-3" >
                <Form.Label>Licencia Medica: </Form.Label>
                <Form.Control 
                  type="text" 
                  value={postprofessional.medicalLicense} 
                  name="medicalLicense" 
                  onChange={(e) => handleChange(e)}
                  />
              </Form.Group>

              {/* Imagen Licencia */}
              <Form.Group className="mb-3" >
                <Form.Label>Imagen de Licencia: </Form.Label>
                <Form.Control 
                  type="text" 
                  value={postprofessional.licenceImage} 
                  name="licenceImage" 
                  onChange={(e) => handleChange(e)}
                  />
              </Form.Group>


            </>
          }

        </>
      }

      <div className="formButtons">

      {/* Submit form button */}
      <Button 
        variant="success" 
        type="submit"  
        >
          {isRegister ? "Registrarse" : " Inicia Sesión"}
      </Button>
    </div>
    </Form>

      <div className="registerNforgottenButtons">
        {/* Register Button */}
        <Button 
          variant="info" 
          size="sm"
          type="submit"  
          onClick={() => setIsRegister(!isRegister)}>

          {isRegister ? "Ya estoy Registrado" : "Quiero Registrarme "}
        </Button>


        {/* Forgotten password  --->   */}
        <Button 
          variant="danger" 
          size="sm"
          onClick={handleRessetPassword} 
          >
          ¿Olvidó su contraseña?
        </Button>
      </div>
     
    </div>
    </div>
  );
}

export default Login;


//css 
