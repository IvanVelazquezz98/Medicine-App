import React from 'react'
import { useDispatch } from 'react-redux'
import { orderByRanking } from '../../Redux-actions'

function OrderByRanking() {
    let dispatch = useDispatch()
    let handleSelect=(e)=>{
      dispatch(orderByRanking(e.target.value))
    }
    return (
      <select name='select' onChange={handleSelect}> 
        <option value='selected' hidden > Ordenar por Ranking </option>
        <option value={'ascendente'}> Menor a Mayor </option>
        <option value={'descendente'}> Mayor a Menor </option>
      </select>   
  )
}

export default OrderByRanking