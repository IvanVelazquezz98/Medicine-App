import React from "react";

const Favorites = ({ image, name, specialty }) => {
  return (
    <div>
      <div>
        <img src={image} alt="Profesional Image" />
      </div>

      <div>
        <h4>{name}</h4>
        <h4>{specialty}</h4>
      </div>
    </div>
  );
};

export default Favorites;
