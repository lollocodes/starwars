import './App.css';
import './Header.css';
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import PlanetsPage from './pages/PlanetsPage';
import StarshipsPage from './pages/StarshipsPage';
import VehiclesPage from './pages/VehiclesPage';
import SpeciesPage from './pages/SpeciesPage'

function App() {
  
const scrollToTop = () => {
  window.scrollTo(0, 0)
}

  return (
    <div className="App">
      
      <Router>
        <div>
        <div className='hero fade-in-image'><Header /></div>
          <nav className='main-nav'>
            <ul className='nav-list'>
              <li className='list-item'>
                <Link to="/">Films</Link>
              </li>
              <li className='list-item'>
                <Link to="/people">People</Link>
              </li>
              <li className='list-item'>
                <Link to="/planets">Planets</Link>
              </li>
              <li className='list-item'>
                <Link to="/starships">Startships</Link>
              </li>
              <li className='list-item'>
                <Link to="/vehicles">Vehicles</Link>
              </li>
              <li className='list-item'>
                <Link to="/species">Species</Link>
              </li>
            </ul>
          </nav>
          
          <div className="main-container">
          <Switch>
            <Route path="/people">
              <PeoplePage />
            </Route>
            <Route path="/planets">
              <PlanetsPage />
            </Route>
            <Route path="/starships">
              <StarshipsPage />
            </Route>
            <Route path="/vehicles">
              <VehiclesPage />
            </Route>
            <Route path="/species">
              <SpeciesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
          </div>
        </div>
      </Router>

            <button className='scroll-to-top' onClick={scrollToTop}>Scroll up</button>
    </div>
  );
}

export default App;
