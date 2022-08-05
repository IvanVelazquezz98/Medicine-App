import React from 'react'
import { useDispatch } from 'react-redux'
import { filterCity} from '../../Redux-actions'

function FilterByCity() {
  let dispatch= useDispatch()
  let ads = useSelector(state=>state.ads)
  let cities= ads.map(e=>{
   return e.professional.user.city
  })
  let setCity= new Set(cities)

  function handleFilter(e){
     dispatch(filterCity(e.target.value))
     //setPageActual(1)
  }
return (
  <select  onChange={handleFilter} name={'city'}>
          <option value='selected' hidden> Ciudades </option>
          {setCity.map(el=>{
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


export default FilterByCity