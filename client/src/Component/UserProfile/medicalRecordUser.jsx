import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import ModalMedicalRecord from './ModalMedicalRecord';
import { useSelector , useDispatch } from 'react-redux';
import { getUserApps ,clearUserAppointments } from '../../Redux-actions';


export default function MedicalRecordUser({userEmail}) {

  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);
  const [show,setShow]= useState(false)
  const [medicalRecord , setMedicalRecord] = useState()
  const [checkboxSelection , setCheckboxSelection] = useState()


  useEffect(() => {
    dispatch(getUserApps(userEmail));
    return() =>{
      dispatch(clearUserAppointments())
   }
  }, [dispatch]);


    const renderHistoryRecordButton = (params) => {
        return (
    
    
          <strong>
            <button
              variant="contained"
              color="primary"
              size="small"
              width='40px'
              style={{ marginLeft: 16 }}
              onClick={(e) => handleOnCellClick(params)}
            >
              Ver Historia Clinica
            </button>
          </strong>
        )
      }
    
      function handleOnCellClick(params) {
        setCheckboxSelection(params)
        setShow(true)
      }
  
    let columns = [{ field: 'Especialidad' }, { field: 'Modalidad' }, { field: 'Medico' }, { field: 'fecha de atencion' }, 
    { field: 'Ver Historia Clinica', renderCell: renderHistoryRecordButton, width: 200,
        disableClickEventBubbling: true
      }]

    let userAppsCompleted = userApps.appointments?.filter((e) => e.status === 'completed')
  
      let idinc = 1
    let rows = userAppsCompleted  ?  userAppsCompleted.map((app)=>{return{
      id:idinc++,
      Especialidad: app.ad?.specialty,
      Modalidad: app.ad?.serviceType,
      Medico: app.ad?.professionalMedicalLicense
    }}):[{id:1,especialidad:'-' , modalidad:'-',Medico:'-',fecha:'-'}]
  
    return (
    <>
        <div>Historia Clinica</div>
        {show ? <ModalMedicalRecord info = {checkboxSelection} /> : null }
        <DataGrid
            columns={columns}
            rows={rows}
        />
    
    </>
  )
}