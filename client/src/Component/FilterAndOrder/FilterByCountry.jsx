import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterCountry} from '../../Redux-actions'

function FilterByCountry() {
  let dispatch= useDispatch()
  let ads = useSelector(state=>state.ads)
  let countries= ads.map(e=>{
   return e.professional.user.country
  })
  let setCountry=[ ...new Set(countries)]

console.log(setCountry);
  function handleFilter(e){
     dispatch(filterCountry(e.target.value))
     //setPageActual(1)
  }
return (
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
)
}


export default FilterByCountry