import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useSelector , useDispatch} from "react-redux";
import Select from "react-select";
import { filterAllAds} from "../../Redux-actions";
import './styleFilter.css'




export default function Suppafilter() {
  let dispatch = useDispatch();
  const ads = useSelector((s) => s.ads);
  const allAds=useSelector(state=>state.allAds)

  
  //filter all atributes from ads global state
  //filtrar todos los atributos y los guardamos en variables
  

  
  
  //crear la lista de select todos los sin repetir, luego armar el objeto en el formato en el que react Select recibe el label y el value
  //create the list of select all without repeating, then build the object in the format in which react Select receives the label and the value
  
  //---specialties
  let specialtyAds = allAds.map((e) => e.specialty);

  let SetSpecialty = [...new Set(specialtyAds)];
  let specialty1 = SetSpecialty.map((e) => {
    return { value: e, label: e };
  });

  //--countries
  let country= allAds.map(e=>{
    return e.professional?.user?.country
   });
   let setCountry= [...new Set(country)];
  const countries= setCountry.map(e=> {return{value:e, label:e}});

  
  
  //--provinces
  let prov = ads.map((e) => {
    return e.professional?.user?.province;
  });
  let setProvince = [...new Set(prov)];
  let provinces = setProvince.map((e) => {
    return { value: e, label: e };
  });
  
  //--cities
  
  let city= ads.map(e=>{
    return e.professional?.user?.city
  });
  
  let setCity= [...new Set(city)];
  
  const cities= setCity.map(e=> {return{value:e, label:e}});

  //opciones de servicios
  const services=[
    {value: 'virtual', label:'virtual'},
    {value: 'domicilio', label:'domicilio'},
    {value: 'presencial', label:'presencial'}
  
  ]
  
  //busco parametros 

  const[searchParams,setSearchParams]= useSearchParams()

  const specialtyQuery = searchParams.get("specialty")
  const countryQuery=searchParams.get("country")
  const provinceQuery=searchParams.get("province")
  const cityQuery=searchParams.get("city")
  const searchFilter = searchParams.get("serviceType")
  
  
  
  function handleFilter(value, action) {
    if(action.action==='clear'){
      console.log(action)
      searchParams.delete([action.name]);
      setSearchParams(searchParams)
    }
    searchParams.set([action.name], value.value);
    setSearchParams(searchParams)
    console.log(action)

    

    
  };
 
  
  
  function handleRemoveFilter(value, action) {
    console.log(action.name)
      searchParams.delete([action.name]);
      setSearchParams(searchParams)
    
    
  };  
    useEffect(() => {
      console.log(Object.fromEntries([...searchParams]));
      dispatch(filterAllAds(Object.fromEntries([...searchParams])))
      
    }, [searchParams])
    

  
 
  

  return (
    <>
    <div className="specialty">
  
      <Select isClearable={true} onChange={handleFilter} name={'specialty'} options= {specialty1} placeholder='filtrar por especialidad'/>
    
          
    
    </div>
    <div className="country">
    <Select isClearable={true}  onChange={handleFilter} name={'country'} options={countries} placeholder='filtra por pais'/>
    
    </div>

    <div className="province">
    
      <Select
       isClearable={true} 
       onChange={handleFilter}
        name={"province"}
        options={provinces}
        placeholder="filtra por provincia"
      />
      
    
  </div>
  <div className="city">
       
      <Select isClearable={true}  onChange={handleFilter} name={'city'} options={cities} placeholder='filtra por cuidad'/>
     
  </div>
  <div className="service">
  <Select isClearable={true} name={'typeService'} onChange={handleFilter} options={services} placeholder='filtra por tipo de servicio'/> 
  
  </div>
  </>
  )
}
