import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import ModalMedicalRecord from './ModalMedicalRecord';
import { useSelector , useDispatch } from 'react-redux';
import { getUserApps ,clearUserAppointments, modalMedicalRecord} from '../../Redux-actions';


export default function MedicalRecordUser({userEmail}) {

  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);
  const show = useSelector((state)=>state.modalMedicalRecord)
  console.log(userApps)
  //const [show,setShow]= useState(false)
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
       dispatch(modalMedicalRecord(true))
      }
  
    let columns = [{ field: 'Especialidad' }, { field: 'Modalidad' }, { field: 'Medico' }, { field: 'fecha' }, 
    { field: 'Ver Historia Clinica', renderCell: renderHistoryRecordButton, width: 200,
        disableClickEventBubbling: true
      }]

    let userAppsCompleted = userApps?.filter((e) => e.status === 'completed')
      console.log('holaaaa', checkboxSelection);
    let rows = userAppsCompleted  ?  userAppsCompleted.map((app)=>{return{
      id:app?.medicalRecord,
      fecha: app.date[2]+'/'+app.date[1]+'/'+app.date[0],
      Especialidad: app.ad?.specialty,
      Modalidad: app.ad?.serviceType,
      Medico: 'dr/a '+app.professional?.user?.name
    }}):[{id:1,especialidad:'-' , modalidad:'-',Medico:'-',fecha:'-'}]
    console.log(checkboxSelection)
    return (
    <>
        <div>Historia Clinica</div>
        {show ? <ModalMedicalRecord info = {checkboxSelection} /> : null }
        <DataGrid
            columns={columns}
            rows={rows}
            width
        />
    
    </>
  )
}