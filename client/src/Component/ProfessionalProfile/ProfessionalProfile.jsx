import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import {getProfessionalById} from '../../Redux-actions'


export default function ProfessionalProfile() {
    const dispatch = useDispatch()
    const {professionalID} = useParams()
    
    useEffect(()=>{
        dispatch(getProfessionalById(professionalID))
    },[dispatch, professionalID])
    let professionalProfile = useSelector(state=>state.professionalProfile)
    
    return (
    <div>{professionalProfile.medicalLicense}</div>
  )
}
