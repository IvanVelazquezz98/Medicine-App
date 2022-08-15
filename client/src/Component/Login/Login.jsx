import React, { useState } from "react";
import firebaseApp from "../../Credential/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import { uploadFile } from "../../Credential/index";
import { postUser, postProfessional} from "../../Redux-actions/index";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalForgotPsw from "./ModalForgotPsw";
import "./Login.css";
import { validate, validateProfessional} from './validate'
import Alert from 'react-bootstrap/Alert';






const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function Login() {


  const firestore = getFirestore(firebaseApp);
  const [isRegister, setIsRegister] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null)


  const [errors, setErrors] = useState({
    name: "",
    email: "",
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
    favorites: [],
  })

  const [post, setPost] = useState({
    name: "",
<<<<<<< HEAD
    email: "",
=======
    email: auth?.currentUser?.email ? auth?.currentUser?.email : "",
    password: "",
>>>>>>> 42a06e78868e0f752404952aa12cad075de10425
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
    favorites: []
  });


  const [professionalError, setprofessionalError] = useState({
    medicalLicense: "",
    licenceImage: "",
    userEmail: "",
  })
  const [postprofessional, setpostprofessional] = useState({
    medicalLicense: "",
    licenceImage: "",
    userEmail: ""
  })
  
  

  async function handleChange(e) {
    e.preventDefault();
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
    setpostprofessional({
      ...postprofessional,
      [e.target.name]: e.target.value,
      userEmail: post.email
    })
    setErrors(validate({
      ...post,
      [e.target.name]: e.target.value
    }))
    setprofessionalError(validateProfessional({
      ...postprofessional,
      [e.target.name]: e.target.value
    }))
  }

  function Verify() {
    sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
  }

  // registrar usuario
  async function userRegister(email, password, rol) {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
      
    ).then((userFirebase) => {
      return userFirebase;
    }).then(function(){
      Verify()
    })
<<<<<<< HEAD
    console.log('es el uid del usuario',userInfo.user.uid);
=======
>>>>>>> 42a06e78868e0f752404952aa12cad075de10425
    const docuRef = doc(firestore, `user/${userInfo.user.uid}`);
    setDoc(docuRef, { email: email, rol: rol });
  }

  const handlefile = async (e) => {
    e.preventDefault();
    try {
      let url = await uploadFile(file);
      setImage(url);
    } catch (err) {
      console.log(err);
    }

  };


 //const [image, setImage] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    validate(post);
    validateProfessional(postprofessional);


    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;

    if (isRegister || auth?.currentUser?.email) {
      userRegister(email, password);
      console.log("entre aca")
      localStorage.setItem("Email", post.email);




      let user = {
        name: post.name,
        email: post.email,
        dateOfBirth: post.dateOfBirth,
        identification: post.identification,
        userimage: image,
        idImage: image,
        country: post.country,
        city: post.city,
        address: post.address,
        province: post.province,
        phone: post.phone,
        rol: post.rol,
        gps: post.gps,
        favorites: []
      };

      //b
      let professional = {
        medicalLicense: postprofessional.medicalLicense,
        licenceImage: image,
        userEmail: postprofessional.userEmail,
      };

      console.log("estoy entrando aca")
      let userCreate = await dispatch(postUser(user));
      if (post.rol === "professional") {
        await dispatch(postProfessional(professional));
      }
      alert("User Created");
      setPost({
        name: "",
        email: "",
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
        favorites: []
      });
      navigate("/")
    } else {
      signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    }
  }


  return (
    <div className="ValidateCOntainer">
      <div className="Validate">
        <h2> {isRegister ? "Registrate" : auth?.currentUser?.email ? "termina de completar tus datos" : "Inicia Sesion"} </h2>
        <Form onSubmit={handleSubmit} className="formContainer mb-2">
          {/* mail */}
          <Form.Group className="mb-3">
            <Form.Label>Correo: </Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder = {auth.currentUser?.email ? auth.currentUser?.email : null}
              value={post.email}
              onChange={(e) => handleChange(e)}
            />
            {errors.email && (<Alert variant='warning' className="error" >{errors.email}</Alert>)}
          </Form.Group>

          {/* password */}
          <Form.Group className="mb-3">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={post.password}
              onChange={(e) => handleChange(e)}
            />
            {errors.password && (<Alert variant='warning' className="error" >{errors.password}</Alert>)}
          </Form.Group>
          {(isRegister || auth?.currentUser?.email) && (
            <>
              {/* name */}


              <Form.Group className="mb-3" >
                <Form.Label>Nombre y Apellido: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && (<Alert variant='warning' className="error" >{errors.name}</Alert>)}
              </Form.Group>

              {/* rol */}
              <Form.Group className="mb-3">
                <Form.Label>Rol: </Form.Label>
                <Form.Select
                  id="rol"
                  name="rol"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="1">...</option>
                  <option value="user">Usuario</option>
                  <option value="professional">Profesional</option>

                </Form.Select>
                {errors.rol && (<Alert variant='warning' className="error" >{errors.rol}</Alert>)}
              </Form.Group>

              {/* fecha de nacimiento */}
              <Form.Group className="mb-3">
                <Form.Label>Fecha de nacimiento: </Form.Label>
                <Form.Control
                  type="date"
                  value={post.dateOfBirth}
                  name="dateOfBirth"
                  onChange={(e) => handleChange(e)}
                />
                {errors.dateOfBirth && (<Alert variant='warning' className="error" >{errors.dateOfBirth}</Alert>)}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Numero Documento: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.identification}
                  name="identification"
                  onChange={(e) => handleChange(e)}
                />
                {errors.identification && (<Alert variant='warning' className="error" >{errors.identification}</Alert>)}
              </Form.Group>

              {/*  Imagen de usuario */}
              <Form.Group className="mb-3">
                <Form.Label>Imagen de Usuario: </Form.Label>
                <Form.Control
                  type="file"
                  name="userimage"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={(e) => handlefile(e)}>Subir Imagen</button>
              </Form.Group>

              {/* ID Imagen */}
              <Form.Group className="mb-3">
                <Form.Label>ID Imagen: </Form.Label>
                <Form.Control
                  type="file"
                  name="idImage"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={(e) => handlefile(e)}>Subir Imagen</button>
                {errors.idImage && (<p className="error">{errors.idImage}</p>)}
              </Form.Group>

              {/* Pais */}
              <Form.Group className="mb-3">
                <Form.Label>Pais: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.country}
                  name="country"
                  onChange={(e) => handleChange(e)}
                />
                {errors.country && (<Alert variant='warning' className="error" >{errors.country}</Alert>)}
              </Form.Group>

              {/*  Provincia */}
              <Form.Group className="mb-3">
                <Form.Label>Provincia: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.province}
                  name="province"
                  onChange={(e) => handleChange(e)}
                />
                {errors.province && (<Alert variant='warning' className="error" >{errors.province}</Alert>)}
              </Form.Group>

              {/* Ciudad  */}
              <Form.Group className="mb-3">
                <Form.Label>Ciudad: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.city}
                  name="city"
                  onChange={(e) => handleChange(e)}
                />
                {errors.city && (<Alert variant='warning' className="error" >{errors.city}</Alert>)}
              </Form.Group>

              {/*  Address */}
              <Form.Group className="mb-3">
                <Form.Label>Dirección: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.address}
                  name="address"
                  onChange={(e) => handleChange(e)}
                />
                {errors.address && (<Alert variant='warning' className="error" >{errors.address}</Alert>)}
              </Form.Group>

              {/*  Telefono */}
              <Form.Group className="mb-3">
                <Form.Label>Teléfono: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.phone}
                  name="phone"
                  onChange={(e) => handleChange(e)}
                />
                {errors.phone && (<Alert variant='warning' className="error" >{errors.phone}</Alert>)}
              </Form.Group>

              {/*  Ubicacion GPS */}
              <Form.Group className="mb-3">
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

                  <Form.Group className="mb-3" >
                    <Form.Label>Licencia Medica: </Form.Label>
                    <Form.Control
                      type="text"
                      value={postprofessional.medicalLicense}
                      name="medicalLicense"
                      onChange={(e) => handleChange(e)}
                    />
                    {professionalError.medicalLicense && (<Alert variant='warning' className="error" >{professionalError.medicalLicensea}</Alert>)}
                  </Form.Group>

                  {/* Imagen Licencia */}
                  <Form.Group className="mb-3" >
                    <Form.Label>Imagen de Licencia: </Form.Label>
                    <Form.Control
                      type="file"
                      name="licenceImage"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button onClick={(e) => handlefile(e)}>Subir Imagen</button>
                  </Form.Group>


                </>
              }
            </>
          )}

          <div className="formButtons">
            {/* Submit form button */}
            <Button variant="success" type="submit">
              {isRegister || auth?.currentUser?.email? "Registrarse" : " Inicia Sesión"}
            </Button>
          </div>
        </Form>

        <div className="registerNforgottenButtons">
          {/* Register Button */}
          <Button
            variant="info"
            size="sm"
            type="submit"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister || auth?.currentUser?.email ? "Ya estoy Registrado" : "Quiero Registrarme "}
          </Button>

          {/* Olvido contraseña */}
          <ModalForgotPsw />
          <Button
            variant="info"
            size="sm"
            type="submit"
            onClick={() => signInWithRedirect(auth, googleProvider)}
          >
            Accede con Google
          </Button>
          <Button
            variant="info"
            size="sm"
            // type="submit"
            onClick={() =>  signOut(auth)}
          >
            Cerrar sesion
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
