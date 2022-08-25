import React from "react";
import './StyleProfile.css';


const ImageUser = ({image}) => {
    return ( 
        <div>
            <img src={image} alt="UserImage" className="image"/>
        </div>
     );
}
 

export default ImageUser;