import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterAllAds} from "../../Redux-actions";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
       <InputGroup className="mb-3">
        <Form.Control
          placeholder="buscar por nombre"
          aria-label="buscar por nombre"
          aria-describedby="basic-addon2"
          value={name}
        onChange={(e) => inputHandler(e)}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={(e) => onClickHandler(e)}>
          Buscar
        </Button>
      </InputGroup>
      
    </div>
  );
};

export default SearchBar1;