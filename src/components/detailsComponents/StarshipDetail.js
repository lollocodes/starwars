import React, {useState, useEffect} from 'react'
import Card
 from '../../UI/Card'
 import retrieveDataList from '../../logic/retriveDataWithUrl';
 import { Link } from 'react-router-dom'
 import { useParams } from 'react-router'
 import getData from '../../logic/findData';

const StarshipDetail = () => {
  const { id } = useParams()
  const [starship, setStarship] = useState([])

  const [showMore, setShowMore] = useState(false);
  const [filmsData, setFilmsData] = useState([]);
  const [pilots, setPilotsData] = useState([]);

  const getSpecificData = async (referenceName, dataToCollect, dataToSet) => {
    if(!localStorage.getItem(referenceName) || JSON.parse(localStorage.getItem(referenceName)).length === 0){
      const getCharacterData = async () => {
        let collectedData;
        collectedData = await retrieveDataList(dataToCollect)
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

  useEffect(() => {
    const getDataToLocalstorage = async() => {
      if(!localStorage.getItem("starship" + id) || JSON.parse(localStorage.getItem("starship" + id)).length === 0){
        const dataPerson = await getData(`https://swapi.dev/api/starships/${id}/`)
        setStarship(dataPerson)
        localStorage.setItem("starship" + id, JSON.stringify(dataPerson))
      } else {
        let storedData = JSON.parse(localStorage.getItem("starship" + id))
        setStarship(storedData)
      }
    }
    getDataToLocalstorage()
  }, [id]);

  const toggleShowMore = () => {
    setShowMore(!showMore)
    if (showMore === false) {
      getSpecificData(starship.name + " films", starship.films, "films")
      getSpecificData(starship.name + " pilots", starship.pilots, "pilots")
    }
  }


  return (
    <Card>
        <h3>{starship.name}</h3>
        <ul>
            <li>Hyperdrive rating: {starship["hyperdrive_rating"]}</li>
            <li>Starship class: {starship["starship_class"]}</li>

            <button className='show-more-btn' onClick={toggleShowMore}>{showMore ? "Close" : "More info"}</button>
          {showMore ? 
          <>
            <h4>Films</h4>
            {filmsData.map((el, index) => {
                return <Link key={index} to={`/film/${(el.url).match(/[0-9]+/)}`}>
                            <p>{el.title}</p>
                      </Link> 
            })}
            {/* {filmsData.map((el) => {
              return <div key={el.title}>
                  <p>{el.title}</p>
              </div>
            })} */}

            <h4>Pilots</h4>
            {pilots.map((el, index) => {
                return <Link key={index} to={`/person/${(el.url).match(/[0-9]+/)}`}>
                          <p>{el.name}</p>
                        </Link> 
            })}
            {/* {pilots.map((el) => {
              return <div key={el.name}>
                  <p>{el.name}</p>
              </div>
            })} */}
            
          </>
          : <></>
        }
        </ul>
    </Card>
  )
}

export default StarshipDetail