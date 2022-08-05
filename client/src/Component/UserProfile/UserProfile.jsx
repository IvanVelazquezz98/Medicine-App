import React from "react";
import MedicalRecordUser from "./medicalRecordUser";
import ImageUser from "./imageProfile";
import Favorites from "./favoritesProfessionalUser";
import InfoUser from "./InfoUserProfile";
import HistoryAppointment from "./historyAppointmentUser";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import {getUsersById} from '../../Redux-actions/index.js'


import firebaseApp from '../../Credential/index'
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(firebaseApp)



const UserProfile = ({user}) => {

const User = useSelector(state=> state.userDetail)
const dispatch = useDispatch();
 
   useEffect(() => {
    console.log(user.email);
      dispatch(getUsersById(user.email))

  },[dispatch])
console.log(User)
    return (<div>


        <ImageUser
        image={User.userimage}
        />

        <InfoUser
         name={User.name}
         email={User.email}
         country={User.country}
         province={User.province}
          city={User.city}
          birthdate={User.dateOfBirth}
          />
        <MedicalRecordUser
        />
        <HistoryAppointment
        />
        <div>
            {User.favorites?.map(pro =>
                
                <Favorites image={pro.userimage} />
                )}
<button onClick ={() => signOut(auth)}>Cerrar session</button> <br/>
        </div>





    </div> );
}
 
export default UserProfile;

// email,
//             password,
//             name,
//             dateOfBirth,
//             identification,
//             userimage,
//             idImage,
//             country,
//             city,
//             address,
//             cp,
//             phone,
//             rol,
//             gps