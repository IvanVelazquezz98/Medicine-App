import React, { useState } from 'react'

import Login from '../Login/Login'
import Prueba1 from '../Mixed/prueba1'

import firebaseApp from '../../Credential/index'
import {getAuth, onAuthStateChanged } from 'firebase/auth'
import {getFirestore, doc, getDoc } from 'firebase/firestore'

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp)

function Validate() {
 const [user, setUser] = useState(null);
 
 async function getRol(uid) {
   const docuRef = doc(firestore, `user/${uid}`)
   const encryptedDoc = await getDoc(docuRef)
   const finalInfo = encryptedDoc.data().rol
return finalInfo
 }

 function setUserWithFirebaseAndRol(userFirebase){
   getRol(userFirebase.uid).then((rol) =>{
     const userData = {
       uid: userFirebase.uid,
       email: userFirebase.email,
       rol: rol,
     }
     setUser(userData)
   })
 }

 onAuthStateChanged(auth, (userFirebase) => {
   if(userFirebase){
     if(!user){
      setUserWithFirebaseAndRol(userFirebase)
     }
   }else{
     setUser(null)
   }
 })
 

  return (
    <div>
      {user ? <Prueba1 user={user} /> : <Login />}
    </div>
  )
}

export default Validate
