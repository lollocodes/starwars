import React, {useState, useEffect} from 'react'
import Card
 from '../../UI/Card'
 import retrieveList from '../../logic/retriveDataWithUrl';

const VehiclesDetails = ({vehicle}) => {
  const [showMore, setShowMore] = useState(false);
  const [filmsData, setFilmsData] = useState([]);
  const [pilots, setPilotsData] = useState([]);

  const getSpecificData = async (referenceName, dataToCollect, dataToSet) => {
    if(!localStorage.getItem(referenceName) || JSON.parse(localStorage.getItem(referenceName)).length === 0){
      const getCharacterData = async () => {
        let collectedData;
        collectedData = await retrieveList(dataToCollect)
        switch (dataToSet) {
          case "films":
            setFilmsData(collectedData)
            break;
          case "pilots":
            setPilotsData(collectedData)
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
        case "films":
          setFilmsData(storedData)
          break;
        case "pilots":
          setPilotsData(storedData)
          break;
        default:
          break;
      }
    }
  }


  const toggleShowMore = () => {
    setShowMore(!showMore)
    if (showMore === false) {
      getSpecificData(vehicle.name + " films", vehicle.films, "films")
      getSpecificData(vehicle.name + " pilots", vehicle.pilots, "pilots")
    }
  }

  return (
    <Card>
        <h3>{vehicle.name}</h3>
        <ul>
            <li>Model: {vehicle.model}</li>
            <li>Manufacturer: {vehicle.manufacturer}</li>

            <button className='show-more-btn' onClick={toggleShowMore}>{showMore ? "Close" : "More info"}</button>
          {showMore ? 
          <>
            <h4>Films</h4>
            {filmsData.map((el) => {
              return <div key={el.title}>
                  <p>{el.title}</p>
              </div>
            })}

            <h4>Pilots</h4>
            {pilots.map((el) => {
              return <div key={el.name}>
                  <p>{el.name}</p>
              </div>
            })}
            
          </>
          : <></>
        }
        </ul>
    </Card>
  )
}

export default VehiclesDetails