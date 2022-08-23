import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
//import ModalMedicalRecord from './ModalMedicalRecord';
import { useSelector, useDispatch } from 'react-redux';
import { getUserApps, clearUserAppointments } from '../../Redux-actions';
import ModalComent from './ModalComents';

export default function Appointments({userEmail , name}) {

  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);
  //const [medicalRecord , setMedicalRecord] = useState()
  const [comentUsers, setComentUsers] = useState()


  useEffect(() => {
    dispatch(getUserApps(userEmail));
    comentsUserfunction(userAppointment)

    return () => {
      dispatch(clearUserAppointments())
    }
  }, [dispatch]);

  let userAppointment = userApps.appointments?.map((e) => e)

  function comentsUserfunction(userAppointment) {

    let comentsUser = userAppointment ?
      userAppointment.find((e) => (e.status === "completed" && e.rating !== null))
      : null

    return setComentUsers(comentsUser)
  }

console.log('userapps', userApps)

    let columns =[{ field: 'fecha' }, { field: 'hora' },
    { field: 'modalidad' }, { field: 'estado' },{ field: 'Medico' },{ field: 'Especialidad' },
    ]

  let userNotPendingApps = userApps.filter((e) => e.status === 'completed'||e.status === 'cancelled'||e.status ==='absent')
      console.log(userNotPendingApps);
    let rows = userNotPendingApps? userNotPendingApps?.map((app)=>{return{
      id: app?.id,
      fecha: app.date[2]+'/'+app.date[1]+'/'+app.date[0],
      hora: app?.startTime[0] + ':' + app?.startTime[1] + 'Hs',
      Especialidad:app?.ad.specialty,
      Medico:'Dr/a '+app?.professional.user.name,
      modalidad: app?.ad?.serviceType,
  
      estado: app?.status,
    }
  }) : [{ id: '1', fecha: '-', hora: '-', paciente: '-', modalidad: '-', estado: '-' }]

  return (
    <>
      <div>Historial de turnos</div>
      {comentUsers ? <ModalComent userEmail={userEmail} info={comentUsers} /> : null}
      <DataGrid
        columns={columns}
        rows={rows}
      />

    </>
  )
}