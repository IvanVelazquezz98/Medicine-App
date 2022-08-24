import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
//import ModalMedicalRecord from './ModalMedicalRecord';
import { useSelector, useDispatch } from 'react-redux';
import { getUserApps, clearUserAppointments } from '../../Redux-actions';
import ModalComent from './ModalComents';

export default function Appointments({userEmail , name}) {

  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);
 


  useEffect(() => {
    dispatch(getUserApps(userEmail));
    return () => {
      dispatch(clearUserAppointments())
    }
  }, [dispatch]);

  let userComentApps = userApps.find((e) => e.status === 'completed' && e.rating === null
  )

 


    let columns =[{ field: 'fecha' }, { field: 'hora' },
    { field: 'modalidad' }, { field: 'estado' },{ field: 'Medico' },{ field: 'Especialidad' },
    ]

  let userNotPendingApps = userApps.filter((e) => e.status === 'completed'||e.status === 'cancelled'||e.status ==='absent')
      
    let rows = userNotPendingApps? userNotPendingApps?.map((app)=>{return{
      id: app?.id,
      fecha: app?.date[2]+'/'+app?.date[1]+'/'+app?.date[0],
      hora: app?.startTime[0] + ':' + app?.startTime[1] + 'Hs',
      Especialidad:app?.ad?.specialty,
      Medico:'Dr/a '+app?.professional?.user?.name,
      modalidad: app?.ad?.serviceType,
  
      estado: app?.status,
    }
  }) : [{ id: '1', fecha: '-', hora: '-', paciente: '-', modalidad: '-', estado: '-' }]

  return (
    <>
      <div>Historial de turnos</div>
      {userComentApps  ? <ModalComent userEmail={userEmail} info={userComentApps} /> : null}
      <DataGrid
        columns={columns}
        rows={rows}
      />

    </>
  )
}