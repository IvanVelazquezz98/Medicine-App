import {  Route, Routes } from "react-router-dom";
import Validate from './Component/Validate/Validate'

function App() {
  return (
    
      <div className="App">
        <Routes>
        <Route path="/" element={<Validate /> } />

        </Routes>
      </div>
   
  );
}

export default App;
