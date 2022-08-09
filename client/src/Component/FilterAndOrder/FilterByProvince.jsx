import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAllAds} from '../../Redux-actions'
import Select from 'react-select'

function FilterByProvince1() {
  let dispatch= useDispatch()
  let ads = useSelector(state=>state.ads)
  
  let prov= ads.map(e=>{
   return e.professional.user.province
  })
  
  let setProvince= [...new Set(prov)]
  

  const options1= setProvince.map(e=> {return{value:e, label:e}})
  function handleFilter(value){
    let payload={
      province: value.value
     }
    dispatch(filterAllAds(payload))
     //setPageActual(1)
  }
return (
  <div>
    {
    <Select  onChange={handleFilter} name={'province'} options={options1} placeholder='filtra por provincia'/>


    }
  </div>
)
}


export default FilterByProvince1