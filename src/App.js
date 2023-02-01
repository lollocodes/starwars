import './App.css';
import './Header.css';
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import {MdOutlineKeyboardArrowUp} from 'react-icons/md'
import {BsFillMoonFill, BsSun} from 'react-icons/bs';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import PlanetsPage from './pages/PlanetsPage';
import StarshipsPage from './pages/StarshipsPage';
import VehiclesPage from './pages/VehiclesPage';
import SpeciesPage from './pages/SpeciesPage'
import PeopleDetails from './components/detailsComponents/PeopleDetails';
import PlanetDetail from './components/detailsComponents/PlanetDetail';
import FilmDetails from './components/detailsComponents/FilmDetails';
import VehiclesDetails from './components/detailsComponents/VehiclesDetails';
import StarshipDetail from './components/detailsComponents/StarshipDetail';
import SpeciesDetail from './components/detailsComponents/SpeciesDetail';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState('darkMode');

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const handleChangeTheme = () => {
    if (theme === 'lightMode') {
      setTheme('darkMode');
    } else {
      setTheme('lightMode');
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <Router>
        <div>
          {/* <Header /> */}
        <div className='hero fade-in-image'>       

        </div>
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
          <button className='mode-btn' onClick={() => {
                  handleChangeTheme()
                }}>
                  {theme === "darkMode" ? <><BsSun/> Light mode</> : <><BsFillMoonFill/> Dark mode</>}
                </button>
          
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
            <Route path="/person/:id">
              <PeopleDetails />
            </Route>
            <Route path="/film/:id">
              <FilmDetails />
            </Route>
            <Route path="/vehicle/:id">
              <VehiclesDetails />
            </Route>
            <Route path="/starship/:id">
              <StarshipDetail />
            </Route>
            <Route path="/specie/:id">
              <SpeciesDetail />
            </Route>
            <Route path="/planet/:id">
              <PlanetDetail />
            </Route>

            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
          </div>
        </div>
      </Router>
      <button className='scroll-to-top' onClick={scrollToTop}><MdOutlineKeyboardArrowUp />Scroll up</button>
    </div>
  );
}

export default App;
