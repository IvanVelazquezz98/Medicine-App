import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, } from "react";
import { clearUserAppointments, getProfessionalApps} from "../../Redux-actions/index.js";
import './Apointments.css'
import { BsCloudFog } from 'react-icons/bs';
import ModalCancel from './ModalCancel.jsx';
import { DataGrid } from '@mui/x-data-grid';



export default function ProfessionalAppointments({ medicalLicense}) {
  const dispatch = useDispatch();
  const professionalApps = useSelector((state) => state.professionalAppointments);
  const [pending , setPending] = useState(false)
  const [completed , setCompleted] = useState(false)
  const [cancelled , setCancelled] = useState(false)
  const [input, setInput]=useState()
  const [show,setShow]= useState(false)

console.log('turnos', professionalApps);

  useEffect(() => {
    dispatch(getProfessionalApps(medicalLicense));
    
  }, [dispatch]);

 function handleClick(e){
  setInput(e.target.value)  
  setShow(true)
  }


  return (

    <div className='conteinerApp'>
      
      <div><h3 >TUS TURNOS</h3></div>
      {professionalApps ? professionalApps.map((app) => {
        return (
            <div className='onecont'>
              <p className='text'> - {app.startTime[0] + ':' + app.startTime[1] + 'Hs'}</p>
              <p className='text'>{app.date[2] +  '/' + app.date[1] + '/' + app.date[0] }</p>
              {app.status === 'pending'? <div><p className='pending'>{app.status}</p><button value={app.id}onClick={handleClick}>cancelar tu turno</button></div>:app.status === 'completed'?<p className='completed'>{app.status}</p>:<p className = 'cancelled'>{app.status}</p>}

            </div>
            
          
        )
      }) : <p>Loading..</p>}
      {/* {show?<ModalCancel input={input} userEmail={userEmail} /* name={user.name} *//>:null} */}
      
    </div>
    
  )
}