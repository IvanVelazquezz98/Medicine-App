import React from 'react'
import FilterBySpecialty1 from './FilterBySpecialty_copy'
import FilterByCountry1 from './FilterByCountry_copy'
import FilterByProvince1 from './FilterByProvince_copy'
import FilterByCity1 from './FilterByCity_copy'
import SearchBar1 from './SearchBar_copy'
import { useDispatch} from 'react-redux'
import { getAds } from '../../Redux-actions'


function AllFilterAndOrder() {
    
    let dispatch=useDispatch()
    function HandleReload(e){
        dispatch(getAds())
    }
  return (
<>
    <div>
       <FilterBySpecialty1  />
        {/* <FilterBySpecialty/> */}
    </div>
    <div>
        <FilterByCountry1/>
        {/* <FilterByCountry /> */}
    </div>
    <div>
        <FilterByProvince1/>
        {/* <FilterByProvince/> */}
    </div>
    <div>
        <FilterByCity1/>
        {/* <FilterByCity/> */}
    </div>
    <div>
        {/* <FilterByServiceType/> */}
    </div>
    <div>
        {/* <OrderByPrice/> */}
    </div>
    <div>
        {/* <OrderByRanking/> */}
    </div>
    <div>
        <SearchBar1/>
        {/* <SearchBar/> */}
    </div>

    <button onClick={HandleReload}>Todos los servicios</button>
    </>
  )
}

export default AllFilterAndOrder