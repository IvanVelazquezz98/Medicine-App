import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
//import ModalMedicalRecord from './ModalMedicalRecord';
import { useSelector, useDispatch } from "react-redux";
import {
  getUserApps,
  clearUserAppointments,
  modalProfessionalApps,
} from "../../Redux-actions";
import ModalComent from "./ModalComents";
import ModalCancel from "../MedicalRecord/ModalConfirma";

export default function AppointmentsPendinUser({ userEmail, name }) {
  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);
  const modalProfApps = useSelector((state) => state.modalProfessionalApps);
  const [checkboxSelection, setCheckboxSelection] = useState();

  useEffect(() => {
    dispatch(getUserApps(userEmail));
    return () => {
      dispatch(clearUserAppointments());
    };
  }, [dispatch]);

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <button
          variant="contained"
          color="primary"
          size="small"
          width="40px"
          style={{ marginLeft: 16 }}
          onClick={(e) => handleOnCellClick(params)}
        >
          Cancelar
        </button>
      </strong>
    );
  };

  function handleOnCellClick(params) {
    setCheckboxSelection(params);
    dispatch(modalProfessionalApps(true));
  }

  let columns = [
    { field: "Fecha" },
    { field: "Hora" },
    { field: "Modalidad" },
    { field: "Estado" },
    { field: "Medico" },
    { field: "Especialidad" },
    {
      field: "Cancelar",
      renderCell: renderDetailsButton,
      width: 200,
      disableClickEventBubbling: true,
    },
  ];

<<<<<<< HEAD
  let userNotPendingApps = userApps.filter((e) => e.status === "pending");

  let rows = userNotPendingApps
    ? userNotPendingApps?.map((app) => {
        return {
          id: app?.id,
          fecha: app?.date[2] + "/" + app?.date[1] + "/" + app?.date[0],
          hora: app?.startTime[0] + ":" + app?.startTime[1] + "Hs",
          Especialidad: app?.ad?.specialty,
          Medico: "Dr/a " + app?.professional?.user?.name,
          modalidad: app?.ad?.serviceType,

          estado: app?.status,
        };
      })
    : [
        {
          id: "1",
          fecha: "-",
          hora: "-",
          paciente: "-",
          modalidad: "-",
          estado: "-",
        },
      ];
=======
  let userNotPendingApps = userApps.filter((e) => e.status === 'pending')
      
    let rows = userNotPendingApps? userNotPendingApps?.map((app)=>{return{
      id: app?.id,
      fecha: app?.date[2]+'/'+(Number(app.date[1])+1).toString()+'/'+app?.date[0],
      hora: app?.startTime[0] + ':' + app?.startTime[1] + 'Hs',
      Especialidad:app?.ad?.specialty,
      Medico:'Dr/a '+app?.professional?.user?.name,
      modalidad: app?.ad?.serviceType,
  
      estado: app?.status,
    }
  }) : [{ id: '1', fecha: '-', hora: '-', paciente: '-', modalidad: '-', estado: '-' }]
>>>>>>> d7d0c0f7807ae73f88e8d4ae62c2e6d95d08d2f0

  return (
    <>
      <div className="profileTitles">Turnos Pendientes</div>
      <div style={{ height: 350, width: "90%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          renderCell={(e) => renderDetailsButton(e)}
        />
      </div>

      {modalProfApps ? (
        <ModalCancel
          input={checkboxSelection}
          userEmail={userEmail}
          name={name}
        />
      ) : null}
    </>
  );
}
