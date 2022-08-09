import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { filterAllAds} from '../../Redux-actions';
import Select from 'react-select'

function FilterByCity1() {
  let ads = useSelector(state=>state.ads)

  

  let dispatch= useDispatch()

  let city= ads.map(e=>{
   return e.professional.user.city
  })

  
  let setCity= [...new Set(city)]

  const options= setCity.map(e=> {return{value:e, label:e}})

  function handleFilter(value){
    let payload={
      city: value.value
     }
    dispatch(filterAllAds(payload))
     //setPageActual(1)
  }

  
return (
  
      
      <Select  onChange={handleFilter} name={'city'} options={options} placeholder='filtra por cuidad'/>
          
   
)
}


export default FilterByCity1