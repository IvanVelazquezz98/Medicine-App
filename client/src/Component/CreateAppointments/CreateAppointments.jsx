import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimeRange from 'react-time-range';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux"
import {postAppointments, getUsersById} from '../../Redux-actions'
const auth = getAuth(firebaseApp);
import { getAuth, signOut } from "firebase/auth";
//import './App.css';
const format = "DD/MM/YYYY";
function CreateAppointments({user}) {

  const dispatch = useDispatch();
  const User = useSelector((state) => state.userDetail)

  useEffect(() => {
    dispatch(getUsersById(user.email));
  }, [dispatch]);

  const [dates, setDates] = useState([]);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
 
  const [morningStartTime, setMorningStartTime] = useState('');
  const [morningEndTime, setMorningEndTime] = useState('');
  const [afternoonStartTime, setAfternoonStartTime] = useState('');
  const [afternoonEndTime, setAfternoonEndTime] = useState('');

  const [duration, setDuration]=useState(10)
  const [timeRanges, setTimeRanges]=useState(false)

  function handleStartTimeChange(e){
     setStartTime(e.startTime)
   }
 
   function handleEndTimeChange(e){ 
    setEndTime(e.endTime) 
   }

   function submitTimeRange(){
    const start = moment(new Date(startTime))
    const end = moment(new Date(endTime))
    setMorningStartTime(`${start.hour()}:${start.minute()}`)
    setMorningEndTime(`${end.hour()}:${end.minute()}`)
    setStartTime(moment())
    setEndTime(moment())
   }

   function submitTimeRange2(){
    const start = moment(new Date(startTime))
    const end = moment(new Date(endTime))
    setAfternoonStartTime(`${start.hour()}:${start.minute()}`)
    setAfternoonEndTime(`${end.hour()}:${end.minute()}`)
    setStartTime(moment())
    setEndTime(moment())
   }

   function newTimeRange(){
    setTimeRanges(true)
   }

   function handleChange(e){
    setDuration(e.target.value)
   }
 
   
   function submit(e){
    let dateArray = dates.map(d=>({day:d.day, month:d.month.index, year:d.year}))
    let appointments={
      dates:dateArray,
      morningStartTime: morningStartTime,
      morningEndTime: morningEndTime,
      afternoonStartTime: afternoonStartTime,
      afternoonEndTime: afternoonEndTime,
      duration: duration,
      medicalLicense: null//pasarle el medical license del usuario
    }
    dispatch(postAppointments(appointments))
   }

   console.log(dates)

  return (
    <div className="App">
      <h1>Crea tus turnos</h1>
      <div style={{ textAlign: "center" }}>
      <p>cuanto dura su turno</p>
      <input placeholder='Cuanto dura su turno?'  type="range" min="10" max="60" name='duration' step='0.5' onChange={(e)=>handleChange(e)}></input>
        <p>{duration} mins</p>
        <DatePicker
          value={dates}
          onChange={setDates}
          multiple
          sort
          format={format}
          calendarPosition="bottom-center"
          plugins={[<DatePanel />]}
        />
      </div>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date.format()}</li>
        ))}
      </ul>
      
      <h3>Rango horario para turnos</h3>
      <TimeRange
        startMoment={startTime}
        endMoment={endTime}
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange}
        />
        <button onClick={submitTimeRange}>confirme rango horario</button>
        <button onClick={newTimeRange}>Seleccione otro rango horario para el mismo dia</button>
        
        <p>rango horario {!timeRanges?'seleccionado':'turno manana'}: {morningStartTime} - {morningEndTime}</p>
        {timeRanges?<><TimeRange
        startMoment={startTime}
        endMoment={endTime}
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange} />
        <button onClick={submitTimeRange2}>confirme rango horario</button>
        <p>rango horario turno tarde: {afternoonStartTime} - {afternoonEndTime}</p></>
        :null}

        <button onclick={(e)=>submit(e)}>confirma tus turnos</button>
        
    </div>
    
  );
}

export default CreateAppointments;