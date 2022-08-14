import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import TimeRange from 'react-time-range';
import moment from 'moment';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import es from 'date-fns/locale/es/'
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { getProfessionalApps } from '../../Redux-actions';


const locales = {
  'es': es
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})


  const events = [
  { 
    title: 'turno con agustin' ,
    start: new Date(2022,7,1,16),
    end: new Date(2022,7,1,18)
  },
  { 
    title: 'turno con b' ,
    start: new Date(2022,7,1,8),
    end: new Date(2022,7,1,9)
  },
  { 
    title: 'turno con v' ,
    start: new Date(2022,7,1,10),
    end: new Date(2022,7,1,11)
  },
  { 
    title: 'turno con f ',
    start: new Date(2022,7,1,12),
    end: new Date(2022,7,1,13)
  }
 ] 

 



function AppCalendario({professionalMedicalLicense}) {
 const dispatch = useDispatch();
 const professionalAppointments = useSelector((state)=>state.professionalAppointments)
  useEffect(() => {
    dispatch(getProfessionalApps(professionalMedicalLicense));
  }, [dispatch]);

  function handleEvent(e){
    e.preventDefault(e);

  }

  console.log('apps',professionalAppointments);
 
  
const appsEvents = professionalAppointments.map(app=>{
  return({
    title: '',
    start: new Date(app.date[0],app.date[1],app.date[2], app.startTime[0],app.startTime[1]),
    end: new Date(app.date[0],app.date[1],app.date[2], app.endTime[0],app.endTime[1])
  }
)})


  console.log(appsEvents);

  return (
    <div className="App">
      <Calendar 
      
    /*   popup
      messages={{
        showMore: total => (
          <div
            style={{ cursor: 'pointer' }}
            onMouseOver={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >{`+${total} more`}
          </div>
        ),
      }} */

      step={5}
      views={{month:true, week:true}}
      localizer={localizer} 
      events ={appsEvents} 
      startAccessor='start' endAccessor='end' 
      style = {{height: 400, width: 500, margin: '10px'}}/>
      
    </div>
  );
}

export default AppCalendario;
