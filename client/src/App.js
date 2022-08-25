import {  Route, Routes } from "react-router-dom";
import Validate from './Component/Validate/Validate'
import Home from "./Component/Home/Home";
import Services from "./Component/Services/Services";
import ProfessionalProfile from "./Component/ProfessionalProfile/ProfessionalProfile";
import AdDetail from "./Component/AdDetail/AdDetail";
import Contact from './Component/Contacto/ContactoForm'
import EditInfo from "./Component/EditInfo/EditInfo"
import EditAd from "./Component/EditAd/EditAd";
import CreateAppointments from "./Component/CreateAppointments/CreateAppointments";
import Recover from "./Component/Recover/Recover"
import DeletedUser from "./Component/DeletedUser/DeletedUser"
import MedicalRecordLog from "./Component/MedicalRecord/MedicalRecordLog";
import NavBarExample from "./Component/Navbar/Navbar";


function App() {
  return (

      <div className="App">
        {/* <NavBarExample/> */}
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/services" element={<Services /> } />
          <Route path="/home/validate" element={<Validate /> } />
          <Route path= '/home/:adID' element ={<AdDetail/>}/>
          <Route path='/professional/:professionalID' element={<ProfessionalProfile />}/>
          <Route path="/contact" element={<Contact /> } />
          <Route path="/profile/:userId" element={<EditInfo/>}/>
          <Route path="/ProfileAd/:AdId" element= {<EditAd/>}/>
          <Route path="/calendar/:adId" element= {<CreateAppointments/>}/>
          <Route path="/recover" element= {<Recover/>}/>
          <Route path="/deletedUser" element= {<DeletedUser/>}/>
          <Route path = '/appointment/id/:idApp' element={<MedicalRecordLog />}/>
        </Routes>
      </div>

  );
}

export default App;
