import React, { useState } from "react";
import firebaseApp from "../../Credential/index";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegister, setIsRegister] = useState(false);

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

  function handleSubmit(e){
      e.preventDefault()

      const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

      if (isRegister){
        userRegister(email, password, rol)
      }else{
        signInWithEmailAndPassword(auth, email, password)
      }
  }

  return (
    <div>
      <h1> {isRegister ? "Registrate" : "inicia Sesión"} </h1>

        <form onSubmit = {handleSubmit}>
        <label>
        Correo:
        <input type = "email" id="email" />
        </label>

        <label>
        Password:
        <input type = "password" id="password" />
        </label>

        <label>
        Rol:
        <select id="rol">
            <option value="usuario">Usuario</option>
            <option value="professional">Profesional</option>
        </select>
        </label>
        </form>
    <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Ya estoy Registrado" : "Quiero Registrarme "}
    </button>


    <input type="submit" value={isRegister ? "Registrarse" : " Inicia Session" } />
    
    </div>
  );
}

export default Login;
