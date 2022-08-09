import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import {getProfessionalById, getAds} from '../../Redux-actions'
import Ad from '../Card/Ad'
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'

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
    console.log(professionalID);
    console.log(ads[0]);
    console.log(professionalAds);
    
    return (
    <div>
        <Navbar/>
        <div className={'imagenPerfil'}>
            {professionalProfile.user?.userimage}
        </div>
        <div>
            <h3>{professionalProfile.medicalLicense}</h3>
            <h3>{professionalProfile.user?.name}</h3>
            {/* hay que modificar esto {professionalProfile.specialty}
            hay que modificar esto {professionalProfile.university} */}
            <h4>{professionalProfile.user?.dateOfBirth}</h4>
            <h4>{professionalProfile.user?.country}, {professionalProfile.user?.city}</h4>
            <div>{professionalProfile?.ranking}</div>
        </div>
        <div>
            About Me
        </div>
        <div>
            Anuncios del Profesional {professionalProfile.user?.name}
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
