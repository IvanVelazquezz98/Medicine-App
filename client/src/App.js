import {  Route, Routes } from "react-router-dom";
import Validate from './Component/Validate/Validate'
import LandingPage from "./Component/LandingPage/LandingPage";
import Home from "./Component/Home/Home";
import ProfessionalProfile from "./Component/ProfessionalProfile/ProfessionalProfile";

function App() {
  return (

      <div className="App">
        <Routes>
        <Route path="/" element={<LandingPage /> } />
        <Route path="/home" element={<Home /> } />
        <Route path="/home/validate" element={<Validate /> } />
        <Route path='/home/:professionalID' element={<ProfessionalProfile />}/>
        </Routes>
      </div>

  );
}

export default App;
