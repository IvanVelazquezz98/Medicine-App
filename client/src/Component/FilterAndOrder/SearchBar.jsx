import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../Redux-actions/index";


const SearchBar = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInput(e.target.value);
    
  };
  const onClickHandler = (e) => {
    if(input.length===0) return alert('ingresa un nombre');
    
    dispatch(getName(input));
    setInput('')
  };



  return (
    <div key="search1" className={s.search}>
      <input 
    
        type="text"
        placeholder="busca por nombre"
        name="input"
        value={input}
        onChange={(e) => inputHandler(e)}
      />
     
        <button className={s.boton} onClick={(e) => onClickHandler(e)}>
          Buscar
        </button>
    
      
    </div>
  );
};

export default SearchBar;