import React, { useState } from 'react'
import {useEffect} from 'react'
// import { Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import {getAdById, getUsersById} from '../../Redux-actions'
import AppCalendario from '../AppCalendario/AppCalendario'
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'

export default function AdDetail() {
    const dispatch = useDispatch()
    const {adID} = useParams()
    const User = useSelector((state) => state.userDetail);
    let adDetail = useSelector(state=>state.adDetail)
    


    useEffect(()=>{
        dispatch(getAdById(adID))
    },[dispatch, adID])

    // useEffect(() => {
    //     dispatch(getUsersById(adDetail.professional?.userEmail));
    //   }, [dispatch]);
    
    const [buttonLi, setbuttonLi] = useState(true)


    return (
    <div>
        <Navbar/>
        <div className={'imagenPerfil'}>
            <img src={adDetail.professional?.user?.userimage}></img>
          <h3>{adDetail.professional?.user?.name}</h3><h3> Licencia Medica : {adDetail.professional?.medicalLicense}</h3>
          <h3> Numero de identidad:{adDetail.professional?.user?.identification} </h3>
          <h5>{adDetail.professional?.user?.country} / {adDetail.professional?.user?.city}</h5>
          <h5>{adDetail?.specialty} $: {adDetail?.price}</h5>
          <h5> Tipo de servicio:{adDetail?.serviceType}</h5>
            <button onClick={() => setbuttonLi(false)}> Ver Imagen de Licencia</button>
            { !buttonLi ? <img  src={adDetail.professional?.licenceImage} />
            : <p></p>     
            }

        </div>
        <div>
          { !adDetail.professional?.medicalLicense ? <p>Loading ..</p>:
            <AppCalendario  name={adDetail.professional?.user?.name} isProfesional={false}ad={adDetail} professionalMedicalLicense={adDetail.professional?.medicalLicense}/>
          }
        </div>
        <Footer/>
    </div>
    
  )
}