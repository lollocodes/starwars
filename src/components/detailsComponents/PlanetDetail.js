import React, {useState, useEffect} from 'react'
import Card
 from '../../UI/Card'
 import retrieveDataList from '../../logic/retriveDataWithUrl';
 import { Link } from 'react-router-dom'
 import { useParams } from 'react-router'
 import getData from '../../logic/findData';

const PlanetDetail = () => {
  const { id } = useParams()
  const [homeworld, setHomeworld] = useState([]);

  const [showMore, setShowMore] = useState(false);
  const [residentsData, setResidentsData] = useState([]);
  const [filmsData, setFilmsData] = useState([]);

  const getSpecificData = async (referenceName, dataToCollect, dataToSet) => {
    if(!localStorage.getItem(referenceName) || JSON.parse(localStorage.getItem(referenceName)).length === 0){
      const getCharacterData = async () => {
        let collectedData;
        collectedData = await retrieveDataList(dataToCollect)
        switch (dataToSet) {
          case "residents":
            setResidentsData(collectedData)
            break;
          case "films":
            setFilmsData(collectedData)
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
        case "residents":
          setResidentsData(storedData)
          break;
        case "films":
          setFilmsData(storedData)
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {
    const getDataToLocalstorage = async() => {
      if(!localStorage.getItem("planet" + id) || JSON.parse(localStorage.getItem("planet" + id)).length === 0){
        const dataPerson = await getData(`https://swapi.dev/api/planets/${id}/`)
        setHomeworld(dataPerson)
        localStorage.setItem("planet" + id, JSON.stringify(dataPerson))
      } else {
        let storedData = JSON.parse(localStorage.getItem("planet" + id))
        setHomeworld(storedData)
      }
    }
    getDataToLocalstorage()
  }, [id]);

  const toggleShowMore = () => {
    setShowMore(!showMore)
    if (showMore === false) {
      getSpecificData(homeworld.name + " residents", homeworld.residents, "residents")
      getSpecificData(homeworld.name + " films", homeworld.films, "films")
    }
  }
  return (
    <Card>
      <ul>
        <h3>{homeworld.name}</h3>
        <li>Rotation period: {homeworld["rotation_period"]}</li>
        <li>Orbital period: {homeworld["orbital_period"]}</li>
        <li>Diameter: {homeworld.diameter}</li>
        <li>Climate: {homeworld.climate}</li>
        <li>Gravity: {homeworld.gravity}</li>
        <li>Terrain: {homeworld.terrain}</li>
        <li>Surface water: {homeworld["surface_water"]}</li>
        <li>Population: {homeworld.population}</li>
      </ul>

      <button className='show-more-btn' onClick={toggleShowMore}>{showMore ? "Close" : "More info"}</button>
          {showMore ? 
          <>
            <h4>Residents</h4>
            {residentsData.map((el, index) => {
              // return <div key={el.name}>
              //     <p>{el.name}</p>
              // </div>
              return ( 
                <Link key={index} to={`/person/${(el.url).match(/[0-9]+/)}`}>
                      <p>{el.name}</p>
                  </Link>
              )
            })}

            <h4>Films</h4>
            {filmsData.map((el, index) => {
              // return <div key={el.title}>
              //     <p>{el.title}</p>
              // </div>
              return (
              <Link key={index} to={`/film/${(el.url).match(/[0-9]+/)}`}>
                      <p>{el.title}</p>
                  </Link>
                )
            })}

          </>
          : <></>
        }
    </Card>
  )
}

export default PlanetDetail