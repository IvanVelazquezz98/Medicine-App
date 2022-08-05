import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterProvince} from '../../Redux-actions'

function FilterByProvince() {
  let dispatch= useDispatch()
  let ads = useSelector(state=>state.ads)
  let prov= ads.map(e=>{
   return e.professional.user.province
  })
  let setProvince= [...new Set(prov)]

  function handleFilter(e){
     dispatch(filterProvince(e.target.value))
     //setPageActual(1)
  }
return (
  <select  onChange={handleFilter} name={'province'}>
          <option value='selected' hidden> Provincias </option>
          {setProvince.map(el=>{
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


export default FilterByProvince