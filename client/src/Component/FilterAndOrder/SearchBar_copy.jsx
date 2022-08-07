import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterAllAds} from "../../Redux-actions";


const SearchBar1 = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setName(e.target.value);
    
  };
  const onClickHandler = (e) => {
    console.log('soy el target del search=>', name)
    if(name.length===0) return alert('ingresa un nombre');
    let payload={
      name: name
     }
    dispatch(filterAllAds(payload));
    setName('')
  };



  return (
    <div key="search1" >
      <input 
        type="text"
        placeholder="busca por nombre"
        name="name"
        value={name}
        onChange={(e) => inputHandler(e)}
      />
     
        <button  onClick={(e) => onClickHandler(e)}>
          Buscar
        </button>
    
      
    </div>
  );
};

export default SearchBar1;