import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import {getProfessionalById, getAds} from '../../Redux-actions'
import Ad from '../Card/Ad'
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'
import './ProfessionalProfile.css';
import ImageUser from "../UserProfile/imageProfile";

export default function ProfessionalProfile() {
    const dispatch = useDispatch()
    
    const {professionalID} = useParams()
    
    let professionalProfile = useSelector(state=>state.professionalProfile)
    let ads= useSelector(state=>state.ads)

    useEffect(()=>{
        dispatch(getProfessionalById(professionalID))
        dispatch(getAds)
    },[dispatch, professionalID])
    
    let professionalAds = ads.filter(ad=>ad.professionalMedicalLicense === professionalID)

    
    return (
    <div>
        <Navbar/>
        <div className="primercont">
        <div className="micontainerImage">
        <img src={professionalProfile.user?.userimage}  className="image"/>
      </div>
        <div>
            <div className="micontainerInfo ">  
         
          <h3>{professionalProfile.medicalLicense} </h3>
          <h3>{professionalProfile.user?.name}</h3>
          <h3>{professionalProfile.user?.dateOfBirth}</h3>
          <h3>{professionalProfile.user?.country}, {professionalProfile.user?.city}</h3>
          <h3>{professionalProfile?.ranking}</h3>
          <h3>{professionalProfile?.User?.dateOfBirth}</h3>
      </div>
        </div>
        </div>
        <div className="sobreMi">
        <h1>Sobre Mi</h1>
        <p>
        {professionalProfile?.aboutMe}
        </p>
      </div>
        <div>
            <h3>MIRA LA DISPONIBILIDAD QUE OFRECE EL PROFESIONAL EN SUS SERVICIOS</h3> 
            
          
            {professionalAds?professionalAds.map(ad=>{
            return(
                <Ad adID={ad.id}
                    name = {ad.professional.user.name}
                    medicalLicense = {ad.professionalMedicalLicense}
                    especialidad = {ad.specialty}
                    serviceType = {ad.serviceType}
                    precio = {ad.price}
                    ranking = {ad.professional.ranking}
                    
                />
            )}):'no tiene servicios aun'}
                <Footer/>

        </div>
        
    </div>
    
  )
}
