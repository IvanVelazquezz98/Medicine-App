import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, } from "react";
import { getUserApps } from "../../Redux-actions/index.js";
import './Apointments.css'








export default function Appointments({ user }) {
  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);
  const [pending , setPending] = useState(false)
  const [completed , setCompleted] = useState(false)
  const [cancelled , setCancelled] = useState(false)



  useEffect(() => {
    dispatch(getUserApps(user.email));

  }, [dispatch]);



  return (

    <div>
      
      {user ? userApps.map((e) => {
        return (
          <div className='conteinerApp'>
            <div><h3 >Historial de turnos</h3></div>
            <div className='onecont'>
            <p className='text'> - {e.startTime[0] + ':' + e.startTime[1] + 'Hs'}</p>
            <p className='text'>{e.date[2] +  '/' + e.date[1] + '/' + e.date[0] }</p>
            { e.status = 'pending' ? <p className='pending'>{e.status}</p> :  <p className='completed'>{e.status}</p> }
            </div>
          </div>
        )
      }) : <p>Loading..</p>}

    </div>
  )
}