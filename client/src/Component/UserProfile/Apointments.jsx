import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import ModalMedicalRecord from './ModalMedicalRecord';
import { useSelector, useDispatch } from 'react-redux';
import { getUserApps, clearUserAppointments } from '../../Redux-actions';
import ModalCancel from './ModalCancel'
import ModalComent from './ModalComents';

export default function MedicalRecordUser({ userEmail, name }) {

  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);
  const [show, setShow] = useState(false)
  const [medicalRecord, setMedicalRecord] = useState()
  const [checkboxSelection, setCheckboxSelection] = useState()
  const [comentUsers, setComentUsers] = useState()


  useEffect(() => {
    dispatch(getUserApps(userEmail));
    comentsUserfunction(userAppointment)

    return () => {
      dispatch(clearUserAppointments())
    }
  }, [dispatch]);


  const renderDetailsButton = (params) => {
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
          Opciones
        </button>
      </strong>
    )
  }

  function handleOnCellClick(params) {
    setCheckboxSelection(params)
    setShow(true)
  }

  let columns = [{ field: 'fecha' }, { field: 'hora' },
  { field: 'modalidad' }, { field: 'estado' },
  {
    field: 'Opciones', renderCell: renderDetailsButton, width: 200,
    disableClickEventBubbling: true
  }]

  let userAppointment = userApps.appointments?.map((e) => e)

  console.log('soy coment', comentUsers)

  function comentsUserfunction(userAppointment) {

    let comentsUser = userAppointment ?
      userAppointment.find((e) => (e.status === "completed" && e.rating !== null))
      : null

    return setComentUsers(comentsUser)
  }

  let rows = userAppointment ? userAppointment.map((app) => {
    return {
      id: app?.id,
      fecha: app?.date,
      hora: app?.startTime[0] + ':' + app?.startTime[1] + 'Hs',
      modalidad: app?.ad?.serviceType,
      estado: app?.status,
    }
  }) : [{ id: '1', fecha: '-', hora: '-', paciente: '-', modalidad: '-', estado: '-' }]

  return (
    <>
      <div>Historial de turnos</div>
      {show ? <ModalCancel userEmail={userEmail} name={name} /> : null}
      {comentUsers ? <ModalComent userEmail={userEmail} info={comentUsers} /> : null}
      <DataGrid
        columns={columns}
        rows={rows}
      />

    </>
  )
}