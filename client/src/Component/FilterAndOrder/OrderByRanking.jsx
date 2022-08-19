import React from 'react'
import { useDispatch } from 'react-redux'
import { orderByRanking } from '../../Redux-actions'
import Select from 'react-select'

function OrderByRanking() {
    let dispatch = useDispatch()
    let handleSelect=(action, value)=>{
      dispatch(orderByRanking(value.value))
    }
    const options=[
      {value: 'minior', label:'mayor ranking'},
      {value: 'mayor', label:'menor ranking'}
    
    ]
    return (
      <Select name='select' onChange={handleSelect}
      options={options} placeholder='ordenar por ranking'/> 
        
  )
}

export default OrderByRanking