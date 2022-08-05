import React from 'react'
import FilterBySpecialty from './FilterBySpecialty'
import FilterByCountry from './FilterByCountry'
import FilterByProvince from './FilterByProvince'
import FilterByCity from './FilterByProvince'
import FilterByServiceType from './FilterByServiceType'
import OrderByPrice from './OrderByPrice'
import OrderByRanking from './OrderByRanking'


function AllFilterAndOrder() {
  return (
<>
    <div>
        <FilterBySpecialty/>
    </div>
    <div>
        <FilterByCountry />
    </div>
    <div>
        <FilterByProvince/>
    </div>
    <div>
        <FilterByCity/>
    </div>
    <div>
        <FilterByServiceType/>
    </div>
    <div>
        <OrderByPrice/>
    </div>
    <div>
        <OrderByRanking/>
    </div>
    </>
  )
}

export default AllFilterAndOrder