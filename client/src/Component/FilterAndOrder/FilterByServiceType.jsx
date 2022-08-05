import React from 'react'
import { useDispatch } from 'react-redux'
import { filterTypeService } from '../../Redux-actions'

function FilterByServiceType() {
    let dispatch= useDispatch()
    function handleFilter(e){
        dispatch(filterTypeService(e.target.value))
    }
    
  return (
    <select name='select' onChange={handleFilter}> 
        <option value='selected' hidden > Filtrar por tipo de servicio: </option>
        <option value={'Presencial'}> Presencial </option>
        <option value={'virtual'}> Virtual </option>
        <option value={'A domicilio'}> A domicilio </option>
      </select>
  )
}

export default FilterByServiceType