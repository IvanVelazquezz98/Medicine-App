import React from 'react'
import FilterBySpecialty1 from './FilterBySpecialty_copy'
import FilterByCountry1 from './FilterByCountry_copy'
import FilterByProvince1 from './FilterByProvince_copy'
import FilterByCity1 from './FilterByCity_copy'
import SearchBar1 from './SearchBar_copy'
import FilterByServiceType from './FilterByServiceType copy'
//import OrderByPrice from './OrderByPrice copy'
//import OrderByRanking from './OrderByRanking copy'
import { useDispatch} from 'react-redux'
import { getAds } from '../../Redux-actions'
import './styleFilter.css'

function AllFilterAndOrder() {
    
    let dispatch=useDispatch()
    function handleReload(){
        dispatch(getAds())
    }
  return (
<div className='filterNav'>
    {/* <div className='specialty'>
        <FilterBySpecialty1/>
    </div> */}
    <div className='country'>
        <FilterByCountry1 />
    </div>
    <div className='province'>
        <FilterByProvince1/>
    </div>
    <div className='city'>
        <FilterByCity1/>
    </div>
    <div className='service'>
        <FilterByServiceType/>
    </div>
    {/* <div className='price'>
        <OrderByPrice/>
    </div>
    <div className='ranking'>
        <OrderByRanking/>
    </div> */}
    <div className='search'>
        <SearchBar1/>
    </div>
    <button onClick={handleReload}>Todos los Anuncios</button>
    </div>

  )
}

export default AllFilterAndOrder