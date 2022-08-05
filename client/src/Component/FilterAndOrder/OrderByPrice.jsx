import React from 'react'
import {useDispatch} from 'react-redux';
import { orderByPrice } from '../../Redux-actions';


function OrderByPrice() {
    let dispatch = useDispatch()
    let handleSelect=(e)=>{
      dispatch(orderByPrice(e.target.value))
    }
    return (
      <select name='select' onChange={handleSelect}> 
        <option value='selected' hidden > Ordenar Por Precio </option>
        <option value={'ascendente'}> Menor a Mayor </option>
        <option value={'descendente'}> Mayor a Menor </option>
      </select>
      
  )
}

export default OrderByPrice