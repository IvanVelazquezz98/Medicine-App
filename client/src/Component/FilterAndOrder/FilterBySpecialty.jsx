import React from 'react'
import { useDispatch } from 'react-redux'
import { filterSpecialty } from '../../Redux-actions'

function FilterBySpecialty() {
  let dispatch= useDispatch()
  let specialty = useSelector(state=>state.ads)
  function handleFilter(e){
     dispatch(filterSpecialty(e.target.value))
     setPageActual(1)
  }
return (
  <select  onChange={handleFilter} name={'specialty'}>
          <option value='selected' hidden> Temperamentos </option>
          {specialty.map(el=>{
            return (
              <option value={el.name ??""} key={el.id} className='option'>
                {el.name}            
              </option>
            ) 
          })
          }
        </select>
)
}


export default FilterBySpecialty