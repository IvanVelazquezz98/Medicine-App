import React from 'react'
import { useDispatch } from 'react-redux'
import { orderByRanking } from '../../Redux-actions'
import Select from 'react-select'

function OrderByRanking() {
    let dispatch = useDispatch()
    let handleSelect=(e)=>{
      dispatch(orderByRanking(e.target.value))
    }
    const options=[
      {value: 'ascendente', label:'mayor ranking'},
      {value: 'descendente', label:'menor ranking'}
    
    ]
    return (
      <Select name='select' onChange={handleSelect}
      options={options} placeholder='ordenar por ranking'/> 
        
  )
}

export default OrderByRanking