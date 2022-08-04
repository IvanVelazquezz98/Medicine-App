import React from 'react'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAds} from '../../Redux-actions'
import Ad from '../Card/Ad'


export default function Ads() {
 const dispatch = useDispatch();

 let ads = useSelector(state=>state.ads)

 useEffect(()=>{
    dispatch(getAds())
 },[dispatch])

  return (
    <div>
      {ads?ads.map(ad=>{
        return(
          <Ad adID={ad.id}
              name = {ad.professional.user.name}
              medicalLicense = {ad.professionalMedicalLicense}
              especialidad = {ad.specialty}
              serviceType = {ad.serviceType}
              precio = {ad.price}
              ranking = {ad.professional.ranking}
              
          />
        )
        }):null}
    </div>
  )
}