import React from 'react'
import {useEffect} from 'react'
// import { Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import {getAdById} from '../../Redux-actions'
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'

export default function AdDetail() {
    const dispatch = useDispatch()
    const {adID} = useParams()
    
    useEffect(()=>{
        dispatch(getAdById(adID))
    },[dispatch, adID])
    
    let adDetail = useSelector(state=>state.adDetail)
    
    return (
    <div>
        <Navbar/>
        <div className={'imagenPerfil'}>
            {adDetail.id}
        </div>
        <div>
        
        </div>
        <div>
            About Me
        </div>
        <Footer/>
    </div>
    
  )
}
