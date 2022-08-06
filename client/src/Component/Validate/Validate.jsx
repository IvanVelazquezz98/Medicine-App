import React, { useState } from "react";
import Login from "../Login/Login";
import firebaseApp from "../../Credential/index";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserProfile from "../UserProfile/UserProfile";


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Validate() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `user/${uid}`);
    const encryptedDoc = await getDoc(docuRef);
    const finalInfo = encryptedDoc.data().rol;
    return finalInfo;
  }

  function setUserWithFirebaseAndRol(userFirebase) {
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol,
      };
      setUser(userData);
    });
  }

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(userFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return <div>{user ? <UserProfile user={user} /> : <Login />}</div>;
}

export default Validate;
