import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useDispatch } from 'react-redux';
import { filterByAdmin } from "../../Redux-actions/index.js";


export default function ListItems(){

 const dispatch = useDispatch()
 
 function handleClick(e){
  console.log(e.target.value , e.target.name)
 let filterAdmin = {
    [e.target.name] : e.target.value
 }
  dispatch(filterByAdmin(filterAdmin))
 }


  return(
    <React.Fragment>
  


 <React.Fragment>
    <ListItemButton >
      <ListItemIcon>
          <PeopleIcon />
      </ListItemIcon>
      <ListItemText  name="ranking" value="mejores" onClick={(e)=>handleClick(e)} primary="mejores profesionales" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
          <PeopleIcon />
      </ListItemIcon>
      <ListItemText  name="ranking" value="peores" onClick={(e)=>handleClick(e)} primary="peores profesionales" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
         <PeopleIcon />
      </ListItemIcon>
      <ListItemText  name="apointemnt" value="users" onClick={(e)=>handleClick(e)} primary="usuarios Top" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText name="created" value="professionals" onClick={(e)=>handleClick(e)} primary="Ultimos professionales" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText name="created" value="users" onClick={(e)=>handleClick(e)} primary="Ultimos usuarios" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
          <PeopleIcon />
      </ListItemIcon>
      <ListItemText name="active" value="yes"  onClick={(e)=>handleClick(e)} primary="Usuarios Activos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
          <PeopleIcon />
      </ListItemIcon>
      <ListItemText  name="active" value="no" onClick={(e)=>handleClick(e)} primary="usuarios inactivos" />
    </ListItemButton>
  </React.Fragment>


 
  <React.Fragment>
    <ListSubheader component="div" inset>
      Reporte de consumos
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Este mes" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Ultimo Trimestre" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Ultimo Año" />
    </ListItemButton>
  </React.Fragment>
  </React.Fragment>
 
);
}