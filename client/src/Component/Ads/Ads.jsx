import React from 'react'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAds} from '../../Redux-actions'
import Ad from '../Card/Ad'
import AllFilterAndOrder from '../FilterAndOrder/AllFilterAndOrder';


export default function Ads() {
 const dispatch = useDispatch();

 let ads = useSelector(state=>state.ads)

 useEffect(()=>{
    dispatch(getAds())
 },[dispatch])

  return (
    <div>
      <AllFilterAndOrder /> 
      {ads?ads.map(ad=>{
        return(
          <div>
          

          <Ad adID={ad.id}
              name = {ad.professional.user.name}
              medicalLicense = {ad.professionalMedicalLicense}
              especialidad = {ad.specialty}
              serviceType = {ad.serviceType}
              precio = {ad.price}
              ranking = {ad.professional.ranking}
              
          />
          </div>
        )
        }):null}
    </div>
  )
}