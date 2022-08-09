import {  Route, Routes } from "react-router-dom";
import Validate from './Component/Validate/Validate'
import Home from "./Component/Home/Home";
import Services from "./Component/Services/Services";
import ProfessionalProfile from "./Component/ProfessionalProfile/ProfessionalProfile";
import AdDetail from "./Component/AdDetail/AdDetail";
import Contact from './Component/Contacto/ContactoForm'

function App() {
  return (

      <div className="App">
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/services" element={<Services /> } />
          <Route path="/home/validate" element={<Validate /> } />
          <Route path= '/home/:adID' element ={<AdDetail/>}/>
          <Route path='/professional/:professionalID' element={<ProfessionalProfile />}/>
          <Route path="/contact" element={<Contact /> } />
        </Routes>
      </div>

  );
}

export default App;
