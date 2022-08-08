import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAllAds } from '../../Redux-actions'
//import Select from 'react-select'

function FilterBySpecialty1() {
  let ads = useSelector(state=>state.allAds)

  // console.log('me trajite de allAds', ads)

  let filter = useSelector(state=>state.filterAd)

  // console.log('me trajite de filterAd', filter)
  let specialtyAds=ads.map(e=>e.specialty)

  // let filterAd = filter.map(e=>e.specialty)

  let SetSpecialty=[...new Set(specialtyAds)]

  // console.log('especialidades filtradas de allAds', SetSpecialty)
  // let SetFilter = [...new Set(filterAd)]

  // console.log('especialidades filtradas de filterAd', SetFilter)

  let dispatch= useDispatch()
  function handleFilter(e){
    let payload={
      specialty: e.target.value
     }
     dispatch(filterAllAds(payload))
     //setPageActual(1)
  }
return (
  <div>
  
    {/* // (filter.length < 1)? */}
      <select  onChange={handleFilter} name={'specialty'}>
          <option value='selected' hidden> Especialidad </option>
          {SetSpecialty.map(el=>{
            return (
              <option value={el ??""} key={el.id} className='option'>
                {el}            
              </option>
            ) 
          })
          }
        </select> 
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