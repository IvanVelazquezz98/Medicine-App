import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  clearUserAppointments,
  getProfessionalApps,
  traemeTodo,
  clearTodo,
} from "../../Redux-actions/index.js";
import "./Apointments.css";
import { BsCloudFog } from "react-icons/bs";
import ModalCancel from "./ModalCancel.jsx";
import { DataGrid } from "@mui/x-data-grid";

export default function ProfessionalAppointments({ medicalLicense, show }) {
  const dispatch = useDispatch();
  const professionalApps = useSelector((state) => state.todo);
  const [pending, setPending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [input, setInput] = useState();
  //const [show,setShow]= useState(false)

  useEffect(() => {
    dispatch(traemeTodo(medicalLicense));
    return () => {
      dispatch(clearTodo());
    };
  }, [dispatch]);

  console.log("turnos", professionalApps);

  let columns = [
    { field: "fecha" },
    { field: "hora" },
    { field: "paciente" },
    { field: "modalidad" },
    { field: "estado" },
  ];

  let rows =
    professionalApps.appointments?.length > 0
      ? professionalApps?.appointments?.map((app) => {
          return {
            id: app?.id,
            fecha: app?.date,
            hora: app?.startTime[0] + ":" + app?.startTime[1] + "Hs",
            paciente: app?.user?.name,
            modalidad: app?.ad?.serviceType,
            estado: app?.status,
          };
        })
      : [
          {
            id: "1",
            fecha: "a",
            hora: "a",
            paciente: "a",
            modalidad: "a",
            estado: "a",
          },
        ];
  return (
    <>
      {show ? 
      (
        <div className="conteinerApp">
          <div>
            <h3>TUS TURNOS</h3>
          </div>
          {professionalApps ? (
            professionalApps.map((app) => {
              return (
                <div className="onecont">
                  <p className="text">
                    {" "}
                    - {app.startTime[0] + ":" + app.startTime[1] + "Hs"}
                  </p>
                  <p className="text">
                    {app.date[2] + "/" + app.date[1] + "/" + app.date[0]}
                  </p>
                  {app.status === "pending" ? (
                    <div>
                      <p className="pending">{app.status}</p>
                      {/* <button value={app.id} onClick={handleClick}>
                        cancelar tu turno
                      </button> */}
                    </div>
                  ) : app.status === "completed" ? (
                    <p className="completed">{app.status}</p>
                  ) : (
                    <p className="cancelled">{app.status}</p>
                  )}
                </div>
              );
            })
          ) : (
            <p>Loading..</p>
          )}
          {/* {show?<ModalCancel input={input} userEmail={userEmail} /* name={user.name} */
          /*>:null} */}
        </div>
      ) : (
        <DataGrid columns={columns} rows={rows} />
      )}
    </>
  );
}
