import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAllAds } from '../../Redux-actions'
import Select from 'react-select'

function FilterBySpecialty1() {
  let ads = useSelector(state=>state.allAds)

  // console.log('me trajite de allAds', ads)

  

  // console.log('me trajite de filterAd', filter)
  let specialtyAds=ads.map(e=>e.specialty)

  // let filterAd = filter.map(e=>e.specialty)

  let SetSpecialty=[...new Set(specialtyAds)]

  // console.log('especialidades filtradas de allAds', SetSpecialty)
  // let SetFilter = [...new Set(filterAd)]

  // console.log('especialidades filtradas de filterAd', SetFilter)

  let dispatch= useDispatch()
  function handleFilter(value){
    let payload={
      specialty: value.value
     }
     dispatch(filterAllAds(payload))
     //setPageActual(1)
  }
  let specialty1= SetSpecialty.map(e=> {return {value: e.name, label : e.name}}  )
return (
  <div>
  
    {/* // (filter.length < 1)? */}
    <Select  onChange={handleFilter} name={'specialty'} options= {specialty1} placeholder='filtrar por especialidad'/>
          {/* <select  onChange={handleFilter} name={'specialty'}>
            <option value='selected' hidden> Especialidad </option>
              {SetFilter.map(el=>{
                return (
                  <option value={el ??""} key={el.id} className='option'>
                    {el}            
                  </option>
                  ) 
                })
              }
          </select>  */}
        
  
  </div>
  
)
}


export default FilterBySpecialty1