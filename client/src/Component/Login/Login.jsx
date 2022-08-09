import React, { useState } from "react";
import firebaseApp from "../../Credential/index";
import { useDispatch, useSelector } from "react-redux"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import { uploadFile } from "../../Credential/index";
import { postUser, postProfessional } from '../../Redux-actions/index'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalForgotPsw from './ModalForgotPsw'
import './Login.css'

const auth = getAuth(firebaseApp);


function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegister, setIsRegister] = useState(false);
  const [file, setFile] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    province: "",
    phone: "",
    rol: "",
    gps: ""
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
      [e.target.name]: e.target.value
    })
    setpostprofessional({
      ...postprofessional,
      [e.target.name]: e.target.value,
      userEmail: post.email
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



  const handlefile = async (e) => {
    e.preventDefault();
    try {
      let url = await uploadFile(file)
      setImage(url)

    } catch (err) {
      console.log(err)
    }
  }

  const [image, setImage] = useState(null)


  async function handleSubmit(e) {
    e.preventDefault();

    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;

    if (isRegister) {

      userRegister(email, password)


      localStorage.setItem("Email", post.email);
      let user = {
        name: post.name,
        email: post.email,
        password: post.password,
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
        gps: post.gps

      }
//b
      let professional = {
        medicalLicense: postprofessional.medicalLicense,
        licenceImage: image,
        userEmail: postprofessional.userEmail
      }


        
      let userCreate = await dispatch(postUser(user))
      if (post.rol === "professional") {
      await dispatch(postProfessional(professional))
      }
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

    } else {
      signInWithEmailAndPassword(auth, email, password)
      navigate('/services')
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
                <Form.Select id="rol" name="rol" onChange={(e) => handleChange(e)}>

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
                <Form.Label>Numero Documento: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.identification}
                  name="identification"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              {/*  Imagen de usuario */}
              <Form.Group className="mb-3" >
                <Form.Label>Imagen de Usuario: </Form.Label>
                <Form.Control
                  type="file"
                  name="userimage"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={(e) => handlefile(e)}>Subir Imagen</button>
              </Form.Group>

              {/* ID Imagen */}
              <Form.Group className="mb-3" >
                <Form.Label>ID Imagen: </Form.Label>
                <Form.Control
                  type="file"
                  name="idImage"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={(e) => handlefile(e)}>Subir Imagen</button>
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


              {/*  Provincia */}
              <Form.Group className="mb-3" >
                <Form.Label>Provincia: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.province}
                  name="province"
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

              {/*  Address */}
              <Form.Group className="mb-3" >
                <Form.Label>Dirección: </Form.Label>
                <Form.Control
                  type="text"
                  value={post.address}
                  name="address"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>



              {/*  Telefono */}
              <Form.Group className="mb-3" >
                <Form.Label>Teléfono: </Form.Label>
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
                      type="file"
                      name="licenceImage"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button onClick={(e) => handlefile(e)}>Subir Imagen</button>
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

          {/* Olvido contraseña */}
          <ModalForgotPsw />

        </div>

      </div>
    </div>
  );
}

export default Login;
