import React, { useState } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'

function MRDocLog({userName, date, time, specialty}) {
  const [log, setLog]= useState('')
 
  
  function handleClick(){
    alert(text)
  }

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
      <h2>Content</h2>
      <p>{parse(text)}</p>
      <button onClick={handleClick}>save</button>
    </div>
    </div>
  );
}

export default MRDocLog;

