import React, { useState, useEffect } from "react";
import firebaseApp from "../../Credential/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { uploadFile } from "../../Credential/index";
import { postUser, postProfessional, getStates, getCountries, getCities} from "../../Redux-actions/index";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalForgotPsw from "./ModalForgotPsw";
import { validate, validateProfessional } from './validate'
import Alert from 'react-bootstrap/Alert';
import Select from "react-select";
import "./Login.css";
import { FcCheckmark } from "react-icons/fc"
import ModalErrors from "../ModalsErrors/ErrorsRouta";






const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function Login() {


  const firestore = getFirestore(firebaseApp);
  const [isRegister, setIsRegister] = useState(false);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null)
  const [filelicence, setFilelicence] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null)
  const [imageId, setImageId] = useState(null)
  const [prolicenceImage, setProLicenceImage] = useState(null)
  const [isRight, setRight] = useState(false)






  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    identification: "",
    idImage: "",
    country: "",
    address: "",
    rol: ""
  })

  const [post, setPost] = useState({
    name: "",
    email: auth?.currentUser?.email ? auth?.currentUser?.email : "",
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
    favorites: []
  });


  const [professionalError, setprofessionalError] = useState({
    medicalLicense: "",
    licenseImage: "",
    userEmail: "",
  })
  const [postprofessional, setpostprofessional] = useState({
    medicalLicense: "",
    licenseImage: "",
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
    }).then(function () {
      Verify()
    })
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
  const handleImageId = async (e) => {
    e.preventDefault();
    try {
      let url = await uploadFile(fileId);
      setImageId(url);
    } catch (err) {
      console.log(err);
    }

  };
  const handleLicenceImage = async (e) => {
    e.preventDefault();
    try {
      let url = await uploadFile(filelicence);
      setProLicenceImage(url);
    } catch (err) {
      console.log(err);
    }

  };
  //---select ----input de paises--
  const [countryId, setCountryId] = useState({
    cid: "",
    sid: ""
  })


  useEffect(() => {
    dispatch(getCountries())
    dispatch(getStates(countryId.cid))
    if (countryId.sid.length) dispatch(getCities(countryId.cid, countryId.sid))



  }, [dispatch, countryId])
  //estados globales de paises, estados y ciudades
  const countries = useSelector(state => state.countries)
  const states = useSelector(state => state.states)
  const cities = useSelector(state => state.cities)
  //--opciones del select
  const countriesOptions = countries.map(e => { return { value: e.countryId, label: e.name } });
  const statesOptions = states.map(e => { return { value: e.provinceId, label: e.name } });
  const citiesOptions = cities.map(e => { return { value: e.name, label: e.name } });

  //handle de esos input
  function handleCountries(value, action) {


    if (action.name === "countries") {

      setCountryId({
        ...countryId,
        cid: value.value
      })
      setPost({
        ...post,
        country: value.label
      })
     
    }
    if (action.name === "states") {
      setCountryId({
        ...countryId,
        sid: value.value
      })

      setPost({
        ...post,
        province: value.label
      })
    }
    if (action.name === "cities") {
      setPost({
        ...post,
        city: value.value
      })
    }


  }


  //const [image, setImage] = useState(null);
  async function handleSubmit(e) {
    localStorage.setItem("Email", post.email);

    e.preventDefault();
    validate(post);
    validateProfessional(postprofessional);


    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;

    if (isRegister || auth?.currentUser?.email) {
      userRegister(email, password);
      


      let user = {
        name: post.name,
        email: post.email,
        password: post.password,
        dateOfBirth: post.dateOfBirth,
        identification: post.identification,
        userimage: image,
        idImage: imageId,
        country: post.country,
        city: post.city,
        address: post.address,
        province: post.province,
        phone: post.phone,
        rol: post.rol,
        favorites: []
      };


      //b
      let professional = {
        medicalLicense: postprofessional.medicalLicense,
        licenceImage: prolicenceImage,
        userEmail: postprofessional.userEmail,
      };
      let userCreate = await dispatch(postUser(user));
      if (post.rol === "professional") {
        await dispatch(postProfessional(professional));
      }
      alert("User Created");
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
        favorites: []
      });
      navigate("/")
    } else {
      signInWithEmailAndPassword(auth, email, password);
      setTimeout(()=>{if (!auth.currentUser?.email){setRight(true)}else navigate("/")},1500)
    }
  }
 


  return (
    <div className="ValidateCOntainer">
      <div className="Validate">
        {isRight && <ModalErrors 
        error={"el usuario o la contraseña son incorrectos"}
        route={"/home/validate"}
        />}
        <h2 className="ValidateTitle"> {isRegister ? "Registrate" : auth?.currentUser?.email ? "Termina de completar tus datos" : "Inicia Sesion"} </h2>
        <Form onSubmit={handleSubmit} className="formContainer mb-2">
          {/* mail */}
          <Form.Group className="mb-3">
            <Form.Label>Correo: </Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder={auth.currentUser?.email ? auth.currentUser?.email : null}
              value={post.email}
              onChange={(e) => handleChange(e)}
            />
            {errors.email && (<Alert variant='warning' className="error" >{errors.email}</Alert>)}
            {!errors.email && (<FcCheckmark />)}
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
            {!errors.password && (<FcCheckmark />)}
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
                {!errors.name && (<FcCheckmark />)}
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
                {!errors.rol && (<FcCheckmark />)}
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
                {!errors.dateOfBirth && (<FcCheckmark />)}
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
                {!errors.identification && (<FcCheckmark />)}
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
                  onChange={(e) => setFileId(e.target.files[0])}
                />
                <button onClick={(e) => handleImageId(e)}>Subir Imagen</button>
                {!imageId && (<Alert variant='warning' className="error"  >la foto dni es necesaria</Alert>)}
                {imageId && (<FcCheckmark />)}
              </Form.Group>

              {/* Pais */}
              <Form.Group className="mb-3" >
                <Form.Label>Pais: </Form.Label>
                <Select onChange={handleCountries} name='countries' options={countriesOptions} placeholder='Seleccione un Pais' />
                {errors.country && (<Alert variant='warning' className="error" >{errors.country}</Alert>)}
                {!errors.country && (<FcCheckmark />)}
              </Form.Group>


              {/*  Provincia */}
              <Form.Group className="mb-3" >
                <Form.Label>Provincia: </Form.Label>
                <Select onChange={handleCountries} name={'states'} options={statesOptions} placeholder='Seleccione una Provincia' />
              </Form.Group>

              {/* Ciudad  */}
              <Form.Group className="mb-3" >
                <Form.Label>Ciudad: </Form.Label>
                <Select onChange={handleCountries} name={'cities'} options={citiesOptions} placeholder='Seleccione una Ciudad' />
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
                {!errors.address && (<FcCheckmark />)}
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
              </Form.Group>

  
              {

                //we check whether or not he/she is a professional 
                (post.rol === "professional") &&
                <>

                  <Form.Group className="mb-3" >
                    <Form.Label>Imagen de Licencia: </Form.Label>
                    <Form.Control
                      type="file"
                      name="licenceImage"
                      onChange={(e) => setFilelicence(e.target.files[0])}
                    />
                    <button onClick={(e) => handleLicenceImage(e)}>Subir Imagen</button>
                    {!prolicenceImage && (<Alert variant='warning' className="error" >la foto de la licencia es necesaria</Alert>)}
                    {prolicenceImage && (<FcCheckmark />)}
                  </Form.Group>

                  <Form.Group className="mb-3" >
                    <Form.Label>Licencia Medica: </Form.Label>
                    <Form.Control
                      type="text"
                      value={postprofessional.medicalLicense}
                      name="medicalLicense"
                      onChange={(e) => handleChange(e)}
                    />
                    {professionalError.medicalLicense && (<Alert variant='warning' className="error" >{professionalError.medicalLicensea}</Alert>)}
                    {!professionalError.medicalLicense && (<FcCheckmark />)}
                  </Form.Group>




                </>
              }
            </>
          )}

          {post.rol === "user" ?
            (isRegister || auth?.currentUser?.email) && (errors.email === "") && (errors.name === "") && (errors.dateOfBirth === "") && (errors.identification === "") && (imageId) && (errors.country === "") && (errors.address === "") && (errors.rol === "") &&
            <div className="formButtons">
              {/* Submit form button */}
              <Button variant="success" type="submit">
                Registrarse
              </Button>
            </div> :
            (isRegister || auth?.currentUser?.email) && (errors.email === "") && (errors.name === "") && (errors.dateOfBirth === "") && (errors.identification === "") && (imageId) && (errors.country === "") && (errors.address === "") && (errors.rol === "") && (prolicenceImage) && (professionalError.medicalLicense === "") &&
            <div className="formButtons">
              {/* Submit form button */}
              <Button variant="success" type="submit">
                Registrarse
              </Button>
            </div>
          }

          {
            (!isRegister && !auth?.currentUser?.email) && (errors.email == "") && (errors.password === "") &&
            <div className="formButtons">
              {/* Submit form button */}
              <Button variant="success" type="submit">
                iniciar sesion
              </Button>
            </div>
          }

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
          {/* <Button
            variant="info"
            size="sm"
            // type="submit"
            onClick={() =>  signOut(auth)}
          >
            Cerrar sesion
          </Button> */}
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Login;
