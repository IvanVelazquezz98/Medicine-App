import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import {getAdById} from '../../Redux-actions'


export default function AdDetail() {
    const dispatch = useDispatch()
    const {adID} = useParams()
    
    useEffect(()=>{
        dispatch(getAdById(adID))
    },[dispatch, adID])
    
    let adDetail = useSelector(state=>state.adDetail)
    
    return (
    <div>
        <div className={'imagenPerfil'}>
            {adDetail.id}
        </div>
        <div>
        
        </div>
        <div>
            About Me
        </div>
    </div>
    
  )
}
