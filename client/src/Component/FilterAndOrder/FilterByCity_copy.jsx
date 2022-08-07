import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { filterAllAds} from '../../Redux-actions'

function FilterByCity1({handleFilter}) {
  let ads = useSelector(state=>state.ads)

  let filterAd=useSelector(state=>state.filterAd)

  let dispatch= useDispatch()

  let city= ads.map(e=>{
   return e.professional.user.city
  })

  let cityFilter=filterAd.map(e=>{
    return e.professional.user.city
   })

  let setCity= [...new Set(city)]

  let setCity2= [...new Set(cityFilter)]

  function handleFilter(e){
    let payload={
      city: e.target.value
     }
    dispatch(filterAllAds(payload))
     //setPageActual(1)
  }

  
return (
  <div>
    {
      
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
      
    }
  </div>
)
}


export default FilterByCity1