import React, {useState, useEffect} from 'react'
import Card
 from '../../UI/Card'
 import { Link } from 'react-router-dom'
 import { useParams } from 'react-router'
 import getData from '../../logic/findData';
import retrieveDataList from '../../logic/retriveDataWithUrl';

const FilmDetails = () => {
  const { id } = useParams()
  const [film, setFilm] = useState(null)

  const [showMore, setShowMore] = useState(false);
  const [characterData, setCharacterData] = useState([]);
  const [planetsData, setPlanetsData] = useState([]);
  const [starshipsData, setStarshipsData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [vehiclesData, setVechiclesData] = useState([]);

  const getSpecificData = async (referenceName, dataToCollect, dataToSet) => {
    if(!localStorage.getItem(referenceName) || JSON.parse(localStorage.getItem(referenceName)).length === 0){
      const getCharacterData = async () => {
        let collectedData;
        collectedData = await retrieveDataList(dataToCollect)
        switch (dataToSet) {
          case "characters":
            setCharacterData(collectedData)
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
          case "planets":
            setPlanetsData(collectedData)
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
        case "characters":
          setCharacterData(storedData)
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
        case "planets":
          setPlanetsData(storedData)
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {
    const getDataToLocalstorage = async() => {
      if(!localStorage.getItem("film" + id) || JSON.parse(localStorage.getItem("film" + id)).length === 0){
        const dataPerson = await getData(`https://swapi.dev/api/films/${id}/`)
        setFilm(dataPerson)
        localStorage.setItem("film" + id, JSON.stringify(dataPerson))
      } else {
        let storedData = JSON.parse(localStorage.getItem("film" + id))
        setFilm(storedData)
      }
    }
    getDataToLocalstorage()
  }, [id]);

  const toggleShowMore = () => {
    setShowMore(!showMore)
    if (showMore === false) {
      getSpecificData(film.title + " characters", film.characters, "characters")
      getSpecificData(film.title + " vehicles", film.vehicles, "vehicles")
      getSpecificData(film.title + " starship", film.starships, "starships")
      getSpecificData(film.title + " species", film.species, "species")
      getSpecificData(film.title + " planets", film.planets, "planets")
    }
  }

  return (
    <Card>
      {film ? 
      <>
      <h3>{film.title}</h3>
        <ul>
            <li>Created: {film.created}</li>
            <li>Episode id: {film["episode_id"]}</li>
            <li>Director: {film.director}</li>
            <li>Producer: {film.producer}</li>
            <li>Release date: {film["release_date"]}</li>
            {/* <li>Opening crawl: {film["opening_crawl"]}</li> */}

            <button className='show-more-btn' onClick={toggleShowMore}>{showMore ? "Close" : "More info"}</button>
          {showMore ? 
          <>
            <h4>Characters</h4>
            {/* {characterData.map((el) => {
              return <div key={el.name}>
                  <p>{el.name}</p>
              </div>
            })} */}

            {characterData.map((el, index) => {
                return <Link key={index} to={`/person/${(el.url).match(/[0-9]+/)}`}>
                            <p>{el.name}</p>
                      </Link> 
            })}

            <h4>Planets</h4>
            {planetsData.map((el, index) => {
                return <Link key={index} to={`/planet/${(el.url).match(/[0-9]+/)}`}>
                              <p>{el.name}</p>
                        </Link> 
            })}

            <h4>Vehicles</h4>
            {vehiclesData.map((el, index) => {
              return <Link key={index} to={`/vehicle/${(el.url).match(/[0-9]+/)}`}>
                        <p>{el.name}</p>
                      </Link> 
            })}

            <h4>Starships</h4>
            {starshipsData.map((el, index) => {
              return <Link key={index} to={`/starship/${(el.url).match(/[0-9]+/)}`}>
                        <p>{el.name}</p>
                      </Link>
            })}

            <h4>Species</h4>
            {speciesData.map((el, index) => {
              return <Link key={index} to={`/specie/${(el.url).match(/[0-9]+/)}`}>
                          <p>{el.name}</p>
                    </Link>
            })}
            
          </>
          : <></>
        }

        </ul>
      </> 
      
      
      : <></>}
        
    </Card>
  )
}

export default FilmDetails