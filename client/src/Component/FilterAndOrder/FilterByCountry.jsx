import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAllAds} from '../../Redux-actions'
import Select from 'react-select'


function FilterByCountry1() {
  let dispatch= useDispatch()
  let ads = useSelector(state=>state.ads)
  
  let country= ads.map(e=>{
   return e.professional.user?.country
  })
 
  let setCountry= [...new Set(country)]
  const options= setCountry.map(e=> {return{value:e, label:e}})


  function handleFilter(value){
    console.log(value)
    
    let payload={
      country: value.value
     }
    dispatch(filterAllAds(payload))
     //setPageActual(1)
  }
  
return (
  <div>
    {
    
    <Select  onChange={handleFilter} name={'country'} options={options} placeholder='filtra por pais'/>
     
    }
  </div>
)
}


export default FilterByCountry1