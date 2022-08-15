import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimeRange from 'react-time-range';
import { useDispatch, useSelector } from "react-redux"
import { getUsersById, createMorningHours, createAfternoonHours, postAppointments} from '../../Redux-actions'
//const auth = getAuth(firebaseApp);
//import { getAuth, signOut } from "firebase/auth";
//import './App.css';
import moment from 'moment';
const format = "DD/MM/YYYY";
function CreateAppointments({user}) {

  const dispatch = useDispatch();
  const User = useSelector((state) => state.userDetail)

  const morningHours = useSelector((state)=>state.morningHours)
  //console.log('estado', morningHours);
  const afternoonHours = useSelector((state)=>state.afternoonHours)
  console.log('estado', morningHours);

  


  useEffect(() => {
    dispatch(getUsersById(user.email));
  }, [dispatch]);

  const [date, setDate] = useState([]);

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
    //console.log(end)
    setMorningStartTime(`${start.hour()}:${start.minute()}`)
    setMorningEndTime(`${end.hour()}:${end.minute()}`)
   
    let morningHours={
        morningStartTime:`${start.hour()}:${start.minute()}`,
        morningEndTime:`${end.hour()}:${end.minute()}`,
        duration:duration
    }
    dispatch(createMorningHours(morningHours))
   }

   /* function submitTimeRange2(){
    const start = moment(new Date(startTime))
    const end = moment(new Date(endTime))
    setMorningStartTime(`${start.hour()}:${start.minute()}`)
    setMorningEndTime(`${end.hour()}:${end.minute()}`)

    setStartTime(moment())
    setEndTime(moment())
   } */

   function submitTimeRange2(){
    const start = moment(new Date(startTime))
    const end = moment(new Date(endTime))
    console.log('soy end=>',end)
    setAfternoonStartTime(`${start.hour()}:${start.minute()}`)
    setAfternoonEndTime(`${end.hour()}:${end.minute()}`)
    /* setStartTime(moment())
    setEndTime(moment())
 */
    let afternoonHours={
        afternoonStartTime:`${start.hour()}:${start.minute()}`,
        afternoonEndTime:`${end.hour()}:${end.minute()}`,
        duration:duration
    }
    dispatch(createAfternoonHours(afternoonHours))
   }

   function newTimeRange(){
    setTimeRanges(true)
   }

   function handleChange(e){
    setDuration(e.target.value)
   }
   let hours= morningHours
   if(afternoonHours){
    hours.concat(afternoonHours)
   }
   
   function submitAll(e){
    console.log('soy e',e);
    let dateArray = date.map(d=>({day:d.day, month:d.month.index, year:d.year}))
    let appointments={
      dates:dateArray,
      hours: morningHours.concat(afternoonHours),
      professionalMedicalLicense: User.professional.medicalLicense,
      ad:User.professional.ads[0].id
    }
    console.log(appointments);
    dispatch(postAppointments(appointments))
   }

   

  return (
    <div className="App">
      <h1>Crea tus turnos</h1>
      <div style={{ textAlign: "center" }}>
      <p>cuanto dura su turno</p>
      <input placeholder='Cuanto dura su turno?'  type="range" min="10" max="60" name='duration' step='10' onChange={(e)=>handleChange(e)}></input>
        <p>{duration} mins</p>
        <p>elegi tus dias de trabajo</p>
        <DatePicker
            placeholder="elige tus fechas"
          value={date}
          onChange={setDate}
          multiple
          sort
          format={format}
          calendarPosition="bottom-center"
          plugins={[<DatePanel />]}
        />
      </div>
      <ul>
        {date.map((date, index) => (
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
        {/* <p>rango horario {!timeRanges?'seleccionado':'turno manana'}: {morningStartTime} - {morningEndTime}</p> */}    
        <button onClick={submitTimeRange}>confirme rango horario</button>
        {morningHours.length>0?morningHours.map((h,i)=><p key={i}>{h};</p>):null}

        <button onClick={newTimeRange}>Seleccione otro rango horario para el mismo dia</button>
        
        
        {timeRanges?<><TimeRange
        startMoment={startTime}
        endMoment={endTime}
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange} />
        {/* <p>rango horario turno tarde: {afternoonStartTime} - {afternoonEndTime}</p> */}
        <button onClick={submitTimeRange2}>confirme rango horario</button>
        {afternoonHours.length>0?afternoonHours.map((h,i)=><p key={i}>{h};</p>):null}
        </>
        
        :null}

        <button onClick={(e)=>submitAll(e)}>confirma tus turnos</button>
        
    </div>
    
  );
}

export default CreateAppointments;