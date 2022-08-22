import React, { useState } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom'
import ModalConfirma from './ModalConfirma'
import { getAppointmentsById} from "../../Redux-actions";

function MedicalRecordLog({}) {
  const [show, setShow]= useState(false)
  const [log, setLog]= useState('')
  navigate = useNavigate()
  const dispatch = useDispatch()
  const {idApp} = useParams()
  
  let age
  function getAge(date){
    Math.floor((new Date() - new Date(date).getTime()) / 3.15576e+10)
    return age
  }

  useEffect(() => {
   dispatch(getAppointmentsById(idApp))
  }, [input]) 
  
  let appInfo = useSelector(state=>state.appointmentInfo)

  const handleClick = () =>{
    setShow(true)
    /* dispatch(putEditAppointment({medicalRecord:log},idApp)) */ 
  } ;

  return (
    <div className="App">
      <div className='editor'>
        
        <CKEditor
          editor={ClassicEditor}
          data ={log}
          onChange={(event, editor)=>{
            const data=editor.getData()
            setLog(data )
          }}
          />
      </div>
    <div>
      <h2>Version final para Historia Clinica</h2>
        <div>
            <h2>Paciente:{appInfo.user.name}</h2>
            <h2>Edad: {getAge(app.Info.user.dateOfBirth)}</h2>
            <h3>Dia: {new Date(appInfo.date)}</h3>
        </div>
        <p>{parse(text)}</p>
      <button onClick={handleClick}>guardar</button>
      {show?<ModalConfirma medicalRecord={medicalRecord} idApp={idApp} />:null}
    </div>
    </div>
  );
}

export default MedicalRecordLog;

