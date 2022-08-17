import React from 'react'
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAds, removeFavorite, addFavorite} from '../../Redux-actions'
import Ad from '../Card/Ad'
import Suppafilter from '../FilterAndOrder/Suppafilter';
import SearchBar from '../FilterAndOrder/SearchBar'

import '../Card/Ad.css'

export default function Ads() {
 const dispatch = useDispatch();

 let ads = useSelector(state=>state.ads)
 let user = useSelector(state=>state.userDetail)

 

 useEffect(()=>{
    dispatch(getAds())
 },[dispatch])

 let favoritesLocalstorage = []

 function handleAddFavorites(e){
  if(user.email){
    let favorites = {
        userEmail : user.email,
        medicalLicense : [e.target.value],
    }
    e.preventDefault();
    dispatch(addFavorite(favorites))
  }else{
    favoritesLocalstorage.push(e.target.value)
    localStorage.setItem("ml", JSON.stringify(favoritesLocalstorage));}
}

function handleRemoveFavorites(e){
  if(user.email){
    let favorites = {
        userEmail : user.email,
        medicalLicense : [e.target.value], 
    }
    e.preventDefault();
    dispatch(removeFavorite(favorites))
}else{
  localStorage.removeItem("ml", e.target.value)
}
}

  return (
    <div className='all'>
      
      <div className='sidebar'>
      <Suppafilter /> 
      </div>
      {ads?ads.map(ad=>{
          if(ad.professional?.user?.rol==="professional" && ad.professional.user.active){
        return(
          <div>
          

          <Ad adID={ad.id}
              name = {ad.professional.user.name}
              medicalLicense = {ad.professionalMedicalLicense}
              especialidad = {ad.specialty}
              serviceType = {ad.serviceType}
              precio = {ad.price}
              ranking = {ad.professional.ranking}
              userimage={ad.professional.user.userimage}
          />
          {/* <button onClick={e=>handleAddFavorites(e)} value ={ad.professionalMedicalLicense}>agregar profesional a favoritos</button>
          <button onClick={e=>handleRemoveFavorites(e)} value={ad.professionalMedicalLicense}>remover profesionalde favoritos</button> */}
          </div>
        )}
        }):null}
    </div>
  )
}