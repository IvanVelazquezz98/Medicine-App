import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAllAds} from '../../Redux-actions'

function FilterByProvince1() {
  let dispatch= useDispatch()
  let ads = useSelector(state=>state.ads)
  let filterAd=useSelector(state=>state.filterAd)
  let prov= ads.map(e=>{
   return e.professional.user.province
  })
  let provFilter=filterAd.map(e=>{
    return e.professional.user.province
   })
  let setProvince= [...new Set(prov)]
  let setProvince2= [...new Set(provFilter)]


  function handleFilter(e){
    let payload={
      province: e.target.value
     }
    dispatch(filterAllAds(payload))
     //setPageActual(1)
  }
return (
  <div>
    {
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


    }
  </div>
)
}


export default FilterByProvince1