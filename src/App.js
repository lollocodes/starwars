import './App.css';
import './Header.css';
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import PlanetsPage from './pages/PlanetsPage';
import StarshipsPage from './pages/StarshipsPage';
import VehiclesPage from './pages/VehiclesPage';
import SpeciesPage from './pages/SpeciesPage'
import PeopleDetails from './components/detailsComponents/PeopleDetails';
import PlanetDetail from './components/detailsComponents/PlanetDetail';
import FilmDetails from './components/detailsComponents/FilmDetails';

function App() {
  
const scrollToTop = () => {
  window.scrollTo(0, 0)
}


  // useEffect(() => {
      
  // }, []);


  return (
    <div className="App">
      
      <Router>
        <div>
        <div className='hero fade-in-image'><Header /></div>
          <nav className='main-nav'>
            <ul className='nav-list'>
              <li className='list-item'>
                <NavLink activeClassName="active" to="/films">Films</NavLink>
              </li>
              <li className='list-item'>
                <NavLink activeClassName="active" to="/people">People</NavLink>
              </li>
              <li className='list-item'>
                <NavLink activeClassName="active" to="/planets">Planets</NavLink>
              </li>
              <li className='list-item'>
                <NavLink activeClassName="active" to="/starships">Startships</NavLink>
              </li>
              <li className='list-item'>
                <NavLink activeClassName="active" to="/vehicles">Vehicles</NavLink>
              </li>
              <li className='list-item'>
                <NavLink activeClassName="active" to="/species">Species</NavLink>
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
            <Route path="/actors/:id">
              <PeopleDetails />
            </Route>
            <Route path="/films/:id">
              <FilmDetails />
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
