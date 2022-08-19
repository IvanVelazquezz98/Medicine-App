import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimeRange from 'react-time-range';
import { useDispatch, useSelector } from "react-redux"
import { getUsersById, createMorningHours, createAfternoonHours, postAppointments, getAdById} from '../../Redux-actions'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './CreateAppointments.css'
import moment from 'moment';
import AppCalendario from "../AppCalendario/AppCalendario";
import { useNavigate, useParams } from "react-router-dom";
import ModalErrors from "../ModalsErrors/ErrorsRouta";
const format = "DD/MM/YYYY";
function CreateAppointments({user}) {
  const {adId} = useParams()
  console.log('soy Params', )
  

  const dispatch = useDispatch();
  // const User = useSelector((state) => state.userDetail)
  const adDetail = useSelector((state) => state.adDetail)
console.log('adDetail', adDetail);
  const morningHours = useSelector((state)=>state.morningHours)
  console.log('estadomorning', morningHours);
  const afternoonHours = useSelector((state)=>state.afternoonHours)
  console.log('estado', afternoonHours);




  useEffect(() => {
    dispatch(getAdById(adId));
  }, [dispatch]);

  const [date, setDate] = useState([]);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
 
  const [morningStartTime, setMorningStartTime] = useState('');
  const [morningEndTime, setMorningEndTime] = useState('');
  const [afternoonStartTime, setAfternoonStartTime] = useState('');
  const [afternoonEndTime, setAfternoonEndTime] = useState('');

  const [duration, setDuration]=useState()
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
    setDuration()
   }

   

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
    setDuration()
   }

   function newTimeRange(){
    setTimeRanges(true)
   }

   function handleChange(e){
    setDuration(e.target.value)
   }
   
   let hours= morningHours.map(hr=>{return hr.start })
   
   if(afternoonHours){
    let aftHours = afternoonHours.map(hr=>{return hr.start})
    hours.concat(aftHours)
   }
   

   console.log(hours);
   const navigate=useNavigate()
   function submitAll(e){
    try {
      console.log('soy e',e);
      let dateArray = date.map(d=>({day:d.day, month:d.month.index, year:d.year}))
      let appointments={
        dates:dateArray,
        hours: hours,
        professionalMedicalLicense: adDetail.professionalMedicalLicense,
        ad:adId
      }
      console.log(appointments);
      dispatch(postAppointments(appointments))
      navigate(`/home/`+ adId)
      
    } catch (error) {
      <ModalErrors error={'no se pudieron crear los turnos'}/>
    }
   }

   let apps = adDetail.appointments?.length
   console.log(apps);
   console.log('duracion',duration);

  return (
    <>
    <Navbar/>
    <div >
    { apps>0?
      <div>
        <h1>Edita tus turnos</h1>
        <AppCalendario  name={adDetail.professional?.user?.name} isProfesional={true}ad={adDetail} professionalMedicalLicense={adDetail.professional?.medicalLicense}/>
      </div>
   :null}
      <div className="conteinerDate">
      <h1>Crea tus turnos</h1>
      <div style={{ textAlign: "center" }}>
      <p>cuanto dura su turno</p>
      <select value={duration} onChange={(e)=>handleChange(e)} >
      <option value='selected' hidden >Duracion del turno</option>
            <option value ={10} >10 mins</option>
            <option value ={20}>20 mins</option>
            <option value ={30}>30 mins</option>
            <option value ={40}>40 mins</option>
            <option value ={50}>50 mins</option>
            <option value ={60}>60 mins</option>
        </select>
        {duration===null?null:<p>{duration} mins</p>}
        <p></p>
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
      <ul className="li">
        {date.map((date, index) => (
        <div className="li">
          <li  key={index}>{date.format()}</li></div>
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
        <button className="button" onClick={submitTimeRange}>Confirme rango horario</button>
        <div className="hourContainer">
        {morningHours.length>0?morningHours.map((h,i)=><div className="li"><p className="li"  key={i}>{h.start};</p></div>):null}
        </div>
        <button className="button" onClick={newTimeRange}>Seleccione otro rango horario para el mismo dia</button>
        
        
        {timeRanges?<><TimeRange
        startMoment={startTime}
        endMoment={endTime}
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange} />
        {/* <p>rango horario turno tarde: {afternoonStartTime} - {afternoonEndTime}</p> */}
        <button className="button" onClick={submitTimeRange2}>Confirme rango horario</button>
        {afternoonHours.length>0?afternoonHours.map((h,i)=><div className="li"><p  key={i}>{h.start};</p></div>):null}
        </>
        
        :null}

        <button className="button" onClick={(e)=>submitAll(e)}>Confirma tus turnos</button>
        
        </div>
          {/* <Footer/> */}
    </div>
    </>
  );
}

export default CreateAppointments;