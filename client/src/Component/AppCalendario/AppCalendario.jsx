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
//import { useNavigate } from "react-router-dom";
import es from 'date-fns/locale/es/'
//import DatePicker, { DateObject } from "react-multi-date-picker";
//import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { getAppointmentsByAdAvailable, getProfessionalApps, selectedTime } from '../../Redux-actions';
import Modal from './Modal';
import ModalCalendar from './Modal';


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


function AppCalendario({professionalMedicalLicense,name, ad, isProfesional}) {
const dispatch = useDispatch();
const availablesApps =  useSelector((state)=>state.availablesApps)
const professionalApps =  useSelector((state)=>state.professionalAppointments)
const selected = useSelector((state)=>state.selectedTime)
// console.log('licencia=>',professionalMedicalLicense,'adID=>',adId,'name=>',name,'ad=>',ad)


 const [eventSelected, setEventSelected]=useState({})
//  console.log('lo se todo', selected)
//  console.log('lo se todo2', professionalMedicalLicense)


 

useEffect(() => {
  
    if(isProfesional){
      return dispatch(getProfessionalApps(professionalMedicalLicense))
    }
    dispatch(getAppointmentsByAdAvailable(ad.id));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getProfessionalApps(professionalMedicalLicense));
  // }, [dispatch]);



  
const handleSelected = (e) => {
  setEventSelected(e)
  dispatch(selectedTime(true))
  
}; 
// console.log('soy eventSelected',eventSelected)

 

//   console.log('apps',professionalAppointments);
 let appsEvents
if(isProfesional){
  appsEvents = professionalApps.map(app=>{
    return({
      id: app.id,
      title: app.professionalMedicalLicense,
      start: new Date(app.date[0],app.date[1],app.date[2], app.startTime[0],app.startTime[1]),
      end: new Date(app.date[0],app.date[1],app.date[2], app.endTime[0],app.endTime[1]),
      status:app.status

    })

})
}else{
  console.log('entrassssss??????')
  appsEvents = availablesApps.map(app=>{

    return({
      id: app.id,
      title: app.professionalMedicalLicense,
      start: new Date(app.date[0],app.date[1],app.date[2], app.startTime[0],app.startTime[1]),
      end: new Date(app.date[0],app.date[1],app.date[2], app.endTime[0],app.endTime[1])
    }
    )})
}

console.log('availablesApps=>', availablesApps)




  

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

      step={30}
      timeslots={1}
      views={{month:true, week:true, day:true}}
      defaultView="week"
      localizer={localizer} 
      events ={appsEvents} 
      onSelectEvent={handleSelected}
      startAccessor='start' endAccessor='end' 
      min={new Date(1, 1, 1, 8, 0, 0)}
      max={new Date(1, 1, 1, 21, 59, 0)}
      style = {{height: 400, width: 500, margin: '10px'}}/>
       {selected?<ModalCalendar info={eventSelected} professionalMedicalLicense={professionalMedicalLicense} name={name}ad={ad} isProfesional={isProfesional}/>:null} 
    </div>
    
  );
}

export default AppCalendario;