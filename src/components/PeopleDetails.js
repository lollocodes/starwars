import React, {useState, useEffect} from 'react'
import Card
 from '../UI/Card'
import FilmDetails from './FilmDetails';
import PlanetDetail from './PlanetDetail';
import StarshipDetail from './StarshipDetail';

import retrieveList from '../logic/retriveDataWithUrl';
import getData from '../logic/findData';
import SpeciesDetail from './SpeciesDetail';
import VehiclesDetails from './VehiclesDetails';

const PeopleDetails = ({person}) => {
  const [showMore, setShowMore] = useState(false);
  const [homeworldData, sethomeworldData] = useState([]);
  const [filmData, setFilmData] = useState([]);
  const [starshipsData, setStarshipsData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [vehiclesData, setVechiclesData] = useState([]);

  // useEffect(() => {
      
  // }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore)

    const getCharacterData = async () => {
      const dataFilms = await retrieveList(person.films)
      setFilmData(dataFilms)
      const dataStarships = await retrieveList(person.starships)
      setStarshipsData(dataStarships)
      const dataVehicles = await retrieveList(person.vehicles)
      setVechiclesData(dataVehicles)
      const dataHomeworld = await getData(person.homeworld)
      sethomeworldData(dataHomeworld)
      const dataSpecies = await retrieveList(person.species)
      setSpeciesData(dataSpecies)
    }

    getCharacterData()
  }

  return (
      <Card>
        <h3>{person.name}</h3>
        <ul>
          <li>Height: {person.height}</li>
          <li>Mass: {person.mass}</li>
          <li>Hair color: {person["hair_color"]}</li>
          <li>Skin color: {person["skin_color"]}</li>
          <li>Eye color: {person["eye_color"]}</li>
          <li>Birth year: {person["birth_year"]}</li>
          <li>Gender: {person.gender}</li>

          <button onClick={toggleShowMore}>{showMore ? "Show less" : "show more"}</button>
          {showMore ? 
          <>
            <h4>Homeworld</h4>
            <PlanetDetail homeworld={homeworldData} />

            <h4>Films</h4>
            {filmData.map((el) => {
              return <FilmDetails key={el.title} film={el} />
            })}
            
            <h4>Starship</h4>
            {starshipsData.map((el) => {
              return <StarshipDetail key={el.name} starship={el} />
            })}

            <h4>Species</h4>
            {speciesData.map((el) => {
              return <SpeciesDetail key={el.name} species={el} />
            })}

            <h4>Vehicles</h4>
            {vehiclesData.map((el) => {
              return <VehiclesDetails key={el.url} vehicle={el} />
            })}
          </>
          : <></>
        }
          
        </ul>
      </Card>
  )
}

export default PeopleDetails