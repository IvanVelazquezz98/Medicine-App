import React from 'react'
import {useDispatch} from 'react-redux';
import { orderByPrice } from '../../Redux-actions';
import Select from 'react-select'


function OrderByPrice() {
    let dispatch = useDispatch()
    let handleSelect=(e)=>{
      dispatch(orderByPrice(e.target.value))
    }
    const options=[
      {value: 'ascendente', label:'menor precio'},
      {value: 'descendente', label:'mayor precio'}
    ]
    return (
      <Select name='select' onChange={handleSelect} options={options} placeholder='ordenar por precio'/> 
  )
}

export default OrderByPrice