import React from "react";


const InfoUser = ({name, email, province, country, city, birthdate}) => {
    return ( <div>
        <h1>{name}</h1>
        <div>
            <h3>Fecha de nacimiento: {birthdate}</h3>
            <h3>Email: {email} </h3>
            <h3>Pais: {country}</h3>
            <h3>Provincia: {province}</h3>
            <h3>Localidad: {city}</h3>

        </div>
    </div> );
}
 
export default InfoUser;