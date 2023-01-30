import React, {useState} from 'react'
import Card
 from '../../UI/Card'
 import retrieveList from '../../logic/retriveDataWithUrl';
 import { Link } from 'react-router-dom'

const PlanetDetail = ({homeworld}) => {
  const [showMore, setShowMore] = useState(false);
  const [residentsData, setResidentsData] = useState([]);
  const [filmsData, setFilmsData] = useState([]);

  const getSpecificData = async (referenceName, dataToCollect, dataToSet) => {
    if(!localStorage.getItem(referenceName) || JSON.parse(localStorage.getItem(referenceName)).length === 0){
      const getCharacterData = async () => {
        let collectedData;
        collectedData = await retrieveList(dataToCollect)
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
      </ul>

      <button className='show-more-btn' onClick={toggleShowMore}>{showMore ? "Close" : "More info"}</button>
          {showMore ? 
          <>
            <h4>Residents</h4>
            {residentsData.map((el) => {
              return <div key={el.name}>
                  <p>{el.name}</p>
              </div>
            })}

            <h4>Films</h4>
            {filmsData.map((el) => {
              return <div key={el.title}>
                  <p>{el.title}</p>
              </div>
            })}

          </>
          : <></>
        }
    </Card>
  )
}

export default PlanetDetail