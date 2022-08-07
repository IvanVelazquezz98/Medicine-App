import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAllAds} from '../../Redux-actions'

function FilterByCountry1() {
  let dispatch= useDispatch()
  let ads = useSelector(state=>state.ads)
  let filterAd=useSelector(state=>state.filterAd)
  let country= ads.map(e=>{
   return e.professional.user.country
  })
  let countryFilter=filterAd.map(e=>{
    return e.professional.user.country
   })
  let setCountry= [...new Set(country)]
  let setCountry2= [...new Set(countryFilter)]


console.log(setCountry);

  function handleFilter(e){
    let payload={
      country: e.target.value
     }
    dispatch(filterAllAds(payload))
     //setPageActual(1)
  }
return (
  <div>
    {
    
          <select  onChange={handleFilter} name={'country'}>
            <option value='selected' hidden> Paises </option>
            {setCountry.map(el=>{
              return (
                <option value={el??""} key={el.id} className='option'>
                  {el}            
                </option>
              ) 
            })
            }
          </select>
     
    }
  </div>
)
}


export default FilterByCountry1