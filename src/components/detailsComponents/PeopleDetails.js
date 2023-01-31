import React, {useState, useEffect} from 'react'
import Card
 from '../../UI/Card'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import retrieveDataList from '../../logic/retriveDataWithUrl';
import getData from '../../logic/findData';

const PeopleDetails = () => {
  const { id } = useParams()
  const [person, setPerson] = useState(null)
  
  const [showMore, setShowMore] = useState(false);
  const [homeworldData, sethomeworldData] = useState([]);
  const [filmData, setFilmData] = useState([]);
  const [starshipsData, setStarshipsData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [vehiclesData, setVechiclesData] = useState([]);

  const getSpecificData = async (referenceName, dataToCollect, dataToSet) => {
    if(!localStorage.getItem(referenceName) || JSON.parse(localStorage.getItem(referenceName)).length === 0){
      const getCharacterData = async () => {
        let collectedData;
        if(dataToCollect === person.homeworld) {
          collectedData = await retrieveDataList([person.homeworld])
        } else {
          collectedData = await retrieveDataList(dataToCollect)
        }
        switch (dataToSet) {
          case "film":
            setFilmData(collectedData)
            break;
          case "starships":
            setStarshipsData(collectedData)
            break;
          case "vehicles":
            setVechiclesData(collectedData)
            break;
          case "species":
            setSpeciesData(collectedData)
            break;
          case "homeworld":
            sethomeworldData(collectedData)
            break;
          default:
            break;
        }
        localStorage.setItem(referenceName, JSON.stringify(collectedData))
      }
      getCharacterData();
    } else {
      let storedData = JSON.parse(localStorage.getItem(referenceName))
      switch (dataToSet) {
        case "film":
          setFilmData(storedData)
          break;
        case "starships":
          setStarshipsData(storedData)
          break;
        case "vehicles":
          setVechiclesData(storedData)
          break;
        case "species":
          setSpeciesData(storedData)
          break;
        case "homeworld":
          sethomeworldData(storedData)
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {
    const getDataToLocalstorage = async() => {
      if(!localStorage.getItem(id) || JSON.parse(localStorage.getItem(id)).length === 0){
        const dataPerson = await getData(`https://swapi.dev/api/people/${id}/`)
        setPerson(dataPerson)
        localStorage.setItem(id, JSON.stringify(dataPerson))
      } else {
        let storedData = JSON.parse(localStorage.getItem(id))
        setPerson(storedData)
      }
    }
    getDataToLocalstorage()
  }, [id]);

  const toggleShowMore = () => {
    setShowMore(!showMore)
    // ------WITHOUT USING LOCALSTORAGE --------//
    // if (showMore === false) {
    //   const getDetailsData = async () => {
    //     const dataFilms = await retrieveList(person.films)
    //     setFilmData(dataFilms)
    //     const dataHomeworld = await getData(person.homeworld)
    //     sethomeworldData(dataHomeworld)
    //     const dataSpecies = await retrieveList(person.species)
    //     setSpeciesData(dataSpecies)
    //     const dataVehicles = await retrieveList(person.vehicles)
    //     setVechiclesData(dataVehicles)
    //     const dataStarships = await retrieveList(person.starships)
    //     setStarshipsData(dataStarships)
    //   }
    //   getDetailsData()
    // }
    if (showMore === false) {
      getSpecificData(person.name + " films", person.films, "film")
      getSpecificData(person.name + " vehicles", person.vehicles, "vehicles")
      getSpecificData(person.name + " starship", person.starships, "starships")
      getSpecificData(person.name + " species", person.species, "species")
      getSpecificData(person.name + " homeworld", person.homeworld, "homeworld")
    }
  }

  return (
      <Card>
        {person ? 
        <>
        <h3>{person.name}</h3>
        <ul>
          <li>Height: {person.height}</li>
          <li>Mass: {person.mass}</li>
          <li>Hair color: {person["hair_color"]}</li>
          <li>Skin color: {person["skin_color"]}</li>
          <li>Eye color: {person["eye_color"]}</li>
          <li>Birth year: {person["birth_year"]}</li>
          <li>Gender: {person.gender}</li>

          <button className='show-more-btn' onClick={toggleShowMore}>{showMore ? "Show less" : "show more"}</button>
          {showMore ? 
          <>
            <h4>Homeworld</h4>
            {homeworldData.map((el, index) => {
              return (
                <Link key={index} to={`/planet/${(el.url).match(/[0-9]+/)}`}>
                  <p>{el.name}</p>
                </Link> 
              )
            })}
            <h4>Films</h4>
            {/* {filmData.map((el) => {
              return <FilmDetails key={el.title} film={el} />
            })} */}
            {filmData.map((el, index) => {
                return <Link key={index} to={`/film/${(el.url).match(/[0-9]+/)}`}>
                            <p>{el.title}</p>
                      </Link> 
            })}
            
            <h4>Starship</h4>
            {starshipsData.map((el, index) => {
              return <Link key={index} to={`/starship/${(el.url).match(/[0-9]+/)}`}>
                        <p>{el.name}</p>
                      </Link>
            })}
            {/* {starshipsData.map((el) => {
              return <StarshipDetail key={el.name} starship={el} />
            })} */}

            <h4>Species</h4>
            {speciesData.map((el, index) => {
              return <Link key={index} to={`/specie/${(el.url).match(/[0-9]+/)}`}>
                          <p>{el.name}</p>
                    </Link>
            })}

            <h4>Vehicles</h4>
            {vehiclesData.map((el, index) => {
              return <Link key={index} to={`/vehicle/${(el.url).match(/[0-9]+/)}`}>
                        <p>{el.name}</p>
                      </Link>
            })}
          </>
          : <></>
        }
          
        </ul>
        </>
        
        :<></>
      }
        
      </Card>
  )
}

export default PeopleDetails