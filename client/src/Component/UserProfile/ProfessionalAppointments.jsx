import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, } from "react";
import { clearUserAppointments, getProfessionalApps, traemeTodo, clearTodo} from "../../Redux-actions/index.js";
import './Apointments.css'
import { BsCloudFog } from 'react-icons/bs';
import ModalCancel from './ModalCancel.jsx';
import { DataGrid } from '@mui/x-data-grid';



export default function ProfessionalAppointments({ medicalLicense, show}) {
  const dispatch = useDispatch();
  const professionalApps = useSelector((state) => state.todo)
  const [pending , setPending] = useState(false)
  const [completed , setCompleted] = useState(false)
  const [cancelled , setCancelled] = useState(false)
  const [input, setInput]=useState()
  //const [show,setShow]= useState(false)

  function handleClick(e){
    alert('hola' )
  }
  
  useEffect(() => {
      dispatch(traemeTodo(medicalLicense));
      return() =>{
        dispatch(clearTodo())
     }
      
    }, [dispatch]);
    
    console.log('turnos', professionalApps);
 
  let columns = [{ field: 'fecha' }, { field: 'hora' }, { field: 'paciente' }, { field: 'modalidad' }, { field: 'estado' },{ field: 'cancela el turno' },{ field: 'Empezar turno' }]
  
  let rows = professionalApps.appointments?.length>0?professionalApps?.appointments?.map((app)=>{return{
    id:app?.id,
    fecha: new Date (app?.date),
    hora: app?.startTime[0] + ':' + app?.startTime[1] + 'Hs',
    paciente: app?.user?.name,
    modalidad: app?.ad?.serviceType,
    estado: app?.status,
    cancel: 'x',
    startAppointment: app?.status === 'pending'?'startAppointment':null
  }}):[{id:'1', fecha:'a', hora:'a', paciente:'a', modalidad:'a', estado:'a', cancel:{value:8}, startAppointment:'start'}]

 
  return (
    <>
    {show?

    <DataGrid
            onCellClick={(e)=>handleClick(e)}
            columns={columns}
            rows={rows}
            />:null
    }
    </>
  
  )
}