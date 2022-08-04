import React, { useState } from "react";
import firebaseApp from "../../Credential/index";
import { useDispatch, useSelector } from "react-redux"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import AllUsers from './AllUsers';
import { postUser ,postProfessional } from '../../Redux-actions/index'

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
    cp: "",
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
      cp: post.cp,
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
      cp: "",
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
    <div>
      <h1> {isRegister ? "Registrate" : "inicia Sesión"} </h1>

      <form onSubmit={handleSubmit} >
        <label>
          Correo:
          <input type="email" id="email" name="email" value={post.email} onChange={(e) => handleChange(e)} />
        </label>

        <label>
          Password:
          <input type="password" id="password" name="password" value={post.password} onChange={(e) => handleChange(e)} />
        </label>

        {!isRegister ? <p></p> :
          
          <>
          <label>
              Nombre:
              <input type="text" value={post.name} name="name" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Rol:
              <select id= "rol" name="rol" onChange={(e) => handleChange(e)}>
                <option  value="user">Usuario</option>
                <option value="professional">Profesional</option>
              </select>
            </label>
            <label>
              Fecha de Nacimiento:
              <input type="date" value={post.dateOfBirth} name="dateOfBirth" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Identificacion:
              <input type="text" value={post.identification} name="identification" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Imagen de usuario:
              <input type="text" value={post.idImage} name="idImage" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              User Imagen:
              <input type="text" value={post.userimage} name="userimage" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Pais:
              <input type="text" value={post.country} name="country" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Ciudad:
              <input type="text" value={post.city} name="city" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Direccion:
              <input type="text" value={post.address} name="address" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Codigo Postal:
              <input type="text" value={post.cp} name="cp" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Numero de celular:
              <input type="text" value={post.phone} name="phone" onChange={(e) => handleChange(e)}></input>
            </label>

            <label>
              Marca tu ibicacion en el mapa:
              <input type="text" value={post.gps} name="gps" onChange={(e) => handleChange(e)}></input>
            </label>
    
            { 
              (post.rol === "professional")  ?
          <>
          
          <label>
            Licencia Medica:
            <input  type="text" value={postprofessional.medicalLicense} name="medicalLicense" onChange={(e) => handleChange(e)}></input>
            </label>
            
            <label>
            Imagen de licencia :
           <input  type="text" value={postprofessional.licenceImage} name="licenceImage" onChange={(e) => handleChange(e)}></input>
            </label>
            </>


                :
                <p></p>

            }
          </>



        }
        <input type="submit"  value={isRegister ? "Registrarse" : " Inicia Session"} />

      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Ya estoy Registrado" : "Quiero Registrarme "}
      </button>

    </div>
  );
}

export default Login;
