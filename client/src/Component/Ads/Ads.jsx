import React from 'react'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAds, removeFavorite, addFavorite} from '../../Redux-actions'
import Ad from '../Card/Ad'
import './Ad.css'
import AllFilterAndOrder from '../FilterAndOrder/AllFilterAndOrder';


export default function Ads() {
 const dispatch = useDispatch();

 let ads = useSelector(state=>state.ads)
 let user = useSelector(state=>state.userDetail)
 console.log(user)
 

 useEffect(()=>{
    dispatch(getAds())
 },[dispatch])


 function handleAddFavorites(e){
    let favorites = {
        userEmail : user.email,
        medicalLicense : e.target.value,
    }
    e.preventDefault();
    dispatch(addFavorite(favorites))
}

function handleRemoveFavorites(e){
    let favorites = {
        userEmail : user.email,
        medicalLicense : e.target.value, 
    }
    e.preventDefault();
    dispatch(removeFavorite(favorites))
}

  return (
    <div >
      <AllFilterAndOrder /> 
      {ads?ads.map(ad=>{
        return(
          <div className="Ads">
          

          <Ad adID={ad.id}
              userimage={ad.professional.user.userimage}
              name = {ad.professional.user.name}
              medicalLicense = {ad.professionalMedicalLicense}
              especialidad = {ad.specialty}
              serviceType = {ad.serviceType}
              precio = {ad.price}
              ranking = {ad.professional.ranking}
          />
          {/* <button onClick={e=>handleAddFavorites(e)} value ={ad.professionalMedicalLicense}>agregar profesional a favoritos</button>
          <button onClick={e=>handleRemoveFavorites(e)} value={ad.professionalMedicalLicense}>remover profesionalde favoritos</button> */}
          </div>
        )
        }):null}
    </div>
  )
}