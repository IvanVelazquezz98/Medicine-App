import { BrowserRouter, Route } from "react-router-dom";
import Ads from './components/Ads/Ads'
import LandingPage from "./components/LandingPage/LandingPage";
import Home from './components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="App">

    
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home} />
        {/* <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={DogDetail} />
        <Route exact path="/create" component={FormDog} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
