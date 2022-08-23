import React, {useEffect, uses} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteByAdmin, forgivenByAdmin, designeAdmin, degredeAdmin } from "../../Redux-actions/index.js";
import SearchBar from './SearchBar';
import { AiOutlineDelete} from "react-icons/ai"
import { FaTrashRestore } from "react-icons/fa"


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

function handleDesigneAdmin(e){
  e.preventDefault();
  dispatch(designeAdmin(e.target.value))
}
function handleDegredeAdmin(e){
  e.preventDefault();
  dispatch(degredeAdmin(e.target.value))
}




  return (
    <React.Fragment>
      <Title>Clientes</Title>
      <SearchBar />
      <Table size="small">
        <TableHead>
          {/* <TableRow> */}
            <TableCell>Mail</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>rol</TableCell>
            <TableCell>ranking</TableCell>
            <TableCell>activo?</TableCell>
            <TableCell>borrado?</TableCell>
            <TableCell align="right">telefono</TableCell>
            <TableCell>echar</TableCell>
            <TableCell>hacer admin</TableCell>
          {/* </TableRow> */}
        </TableHead>
        <TableBody>
          {Users.map((User) => (
            <TableRow key={User.id}>
              <TableCell>{User?.email}</TableCell>
              <TableCell>{User?.name}</TableCell>
              <TableCell>{User?.rol}</TableCell>
              <TableCell>{User?.professional?.ranking}</TableCell>
              <TableCell>{(User?.active) ? "activo" : "inactivo"}</TableCell>
              <TableCell>{(User?.deletedByAdmin) ? "eliminado" : "no eliminado"}</TableCell>
              <TableCell align="right">{`$${User?.phone}`}</TableCell>
              {(!User?.deletedByAdmin) ? <button value={User.id} onClick={(e)=>handleDelete(e)}><AiOutlineDelete /></button>:
                                         <button value={User.email} onClick={(e)=>handleForgive(e)}><FaTrashRestore /></button>}
               <TableCell> </TableCell>
              {(User?.rol !== "admin") ? <button value={User.id} onClick={(e)=>handleDesigneAdmin(e)}>poner</button>:
                                         <button value={User.id} onClick={(e)=>handleDegredeAdmin(e)}>sacar</button>}
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