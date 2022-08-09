import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAllAds } from '../../Redux-actions'
import Select from 'react-select'
function FilterByServiceType() {
    let dispatch= useDispatch()
    function handleFilter(value){
        dispatch(filterAllAds(value.value))
    }
    const options=[
      {value: 'virtual', label:'virtual'},
      {value: 'domicilio', label:'domicilio'},
      {value: 'presencial', label:'presencial'}
    
    ]
    
  return (
    <Select name='select' onChange={handleFilter} options={options} placeholder='filtra por tipo de servicio'/> 
  )
}

export default FilterByServiceType