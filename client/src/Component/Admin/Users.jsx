import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {filterByAdmin, clearTodo,} from "../../Redux-actions/index.js";
import { DataGrid } from '@mui/x-data-grid';




export default function ProfessionalAppointments( ) {
  const dispatch = useDispatch();
  const [checkboxSelection, setCheckboxSelection] = useState(null)
  
  const Users = useSelector((state)=> state.users)
console.log(Users);
  useEffect(() => {
    dispatch(filterByAdmin({appointment: 'users'}))

    return () => {
      dispatch(clearTodo())
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

 


  let columns = [{ field: 'Nombre' }, { field: 'Mail' }, { field: 'totalTurnos' },
  { field: 'totalIngreso' }, { field: 'activo' }, 
  {
    field: 'Opciones', renderCell: renderDetailsButton, width: 300,
    disableClickEventBubbling: true
  }]


  


  let rows = Users ? Users?.map((user) => {


    return {
      id: user.userEmail,
      Nombre: user.name,
      Mail: user.userEmail,
      totalTurnos: user.totalAppointments,
      totalIngreso: user.totalPricesAppointments,
      activo: user.active
      

    }
  }) : [{ id: '1',  Nombre: '-', Mail: '-', totalTurnos: '-', totalIngreso: '-', activo: '-' }]

 

  return (
<div className="miadminApp">
   
      
        <DataGrid
          columns={columns}
          rows={rows}
          renderCell={(e) => renderDetailsButton(e)}
          
        />
     

      
   
    </div>

  )
}