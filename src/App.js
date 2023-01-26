import './App.css';
import {useState, useEffect } from 'react';
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
  const [films, setFilms] = useState([])
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);

  const endPointLookupURL = endPoint => {
    return `https://swapi.dev/api/${endPoint}/?page`
  }

  function fetchJson(url) {
    return fetch(url).then(resp => resp.json());
  }

  function findDataUrl(endPoint) {
    let url = endPointLookupURL(endPoint);
    return fetchJson(url)
  }

  useEffect(() => {
    fetchData("films").then(resFilms => setFilms(resFilms.results))
    fetchData("people").then(resPeople => setPeople(resPeople.results))
    fetchData("planets").then(resPlanets => setPlanets(resPlanets.results))
    fetchData("starships").then(resStarships => setStarships(resStarships.results))
    fetchData("vehicles").then(resVehicles => setVehicles(resVehicles.results))
    fetchData("species").then(resSpecies => setSpecies(resSpecies.results))
  }, [])

 const fetchData = async (endPoint) => {
      const response = await findDataUrl(endPoint);
      console.log(response);
      return response;
  }

  return (
    <div className="App">
      
      <Router>
        <div>
        <div className='hero fade-in-image'></div>
          <nav>
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
              <PeoplePage data={people} />
            </Route>
            <Route path="/planets">
              <PlanetsPage data={planets} />
            </Route>
            <Route path="/starships">
              <StarshipsPage data={starships} />
            </Route>
            <Route path="/vehicles">
              <VehiclesPage data={vehicles} />
            </Route>
            <Route path="/species">
              <SpeciesPage data={species} />
            </Route>
            <Route path="/">
              <HomePage data={films} />
            </Route>
          </Switch>
          </div>
        </div>
      </Router>

    </div>
  );
}

export default App;
