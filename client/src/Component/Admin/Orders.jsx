import React, {useEffect, uses} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteByAdmin, forgivenByAdmin } from "../../Redux-actions/index.js";
import SearchBar from './SearchBar';



function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {



  const dispatch = useDispatch()
const Users = useSelector((state)=> state.users)

useEffect( () => {;
  dispatch(getUsers())
}, [dispatch]);

function handleDelete(e){
  e.preventDefault();
  dispatch(deleteByAdmin(e.target.value))
}
function handleForgive(e){
  e.preventDefault();
  dispatch(forgivenByAdmin(e.target.value))
}




  return (
    <React.Fragment>
      <Title>Clientes</Title>
      <SearchBar />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mail</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Pais</TableCell>
            <TableCell>rol</TableCell>
            <TableCell>ranking</TableCell>
            <TableCell>activo?</TableCell>
            <TableCell>borrado?</TableCell>
            <TableCell align="right">telefono</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Users.map((User) => (
            <TableRow key={User.id}>
              <TableCell>{User?.email}</TableCell>
              <TableCell>{User?.name}</TableCell>
              <TableCell>{User?.country}</TableCell>
              <TableCell>{User?.rol}</TableCell>
              <TableCell>{User?.professional?.ranking}</TableCell>
              <TableCell>{(User?.active) ? "activo" : "inactivo"}</TableCell>
              <TableCell>{(User?.deletedByAdmin) ? "eliminado" : "no eliminado"}</TableCell>
              <TableCell align="right">{`$${User?.phone}`}</TableCell>
              {(!User?.deletedByAdmin) ? <button value={User.id} onClick={(e)=>handleDelete(e)}>x</button>:
                                         <button value={User.email} onClick={(e)=>handleForgive(e)}>o</button>}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}