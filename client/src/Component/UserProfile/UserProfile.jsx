import React from "react";
import MedicalRecordUser from "./medicalRecordUser";
import ImageUser from "./imageProfile";
import Favorites from "./favoritesProfessionalUser";
import InfoUser from "./InfoUserProfile";
import HistoryAppointment from "./historyAppointmentUser";
import { useSelector } from "react-redux";



const UserProfile = () => {

const allUsers = useSelector(state=> state.allUsers)

    return (<div>


        <ImageUser />
        <InfoUser/>
        <MedicalRecordUser/>
        <HistoryAppointment/>
        <Favorites/>





    </div> );
}
 
export default UserProfile;