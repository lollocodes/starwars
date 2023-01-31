import React, {useState, useEffect} from 'react'
import Card
 from '../../UI/Card'
 import retrieveDataList from '../../logic/retriveDataWithUrl';
 import getData from '../../logic/findData';
 import { Link } from 'react-router-dom'
 import { useParams } from 'react-router'

const SpeciesDetail = () => {
  const { id } = useParams()
  const [species, setSpecies] = useState([])

  const [showMore, setShowMore] = useState(false);
  const [filmsData, setFilmsData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [homeworldData, sethomeworldData] = useState(null);


  const getSpecificData = async (referenceName, dataToCollect, dataToSet) => {
    if(!localStorage.getItem(referenceName) || JSON.parse(localStorage.getItem(referenceName)).length === 0){
      const getCharacterData = async () => {
        let collectedData;
        if(dataToCollect === species.homeworld) {
          if (species.homeworld === null) return
          collectedData = await retrieveDataList([species.homeworld])
        } else {
          collectedData = await retrieveDataList(dataToCollect)
        }
        switch (dataToSet) {
          case "films":
            setFilmsData(collectedData)
            break;
          case "people":
            setPeopleData(collectedData)
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
        case "films":
          setFilmsData(storedData)
          break;
        case "people":
          setPeopleData(storedData)
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
      if(!localStorage.getItem("specie" + id) || JSON.parse(localStorage.getItem("specie" + id)).length === 0){
        const dataPerson = await getData(`https://swapi.dev/api/species/${id}/`)
        setSpecies(dataPerson)
        localStorage.setItem("specie" + id, JSON.stringify(dataPerson))
      } else {
        let storedData = JSON.parse(localStorage.getItem("specie" + id))
        setSpecies(storedData)
      }
    }
    getDataToLocalstorage()
  }, [id]);

  const toggleShowMore = () => {
    setShowMore(!showMore)
    if (showMore === false) {
      getSpecificData(species.name + " films", species.films, "films")
      getSpecificData(species.name + " people", species.people, "people")
      getSpecificData(species.name + " homeworld", species.homeworld, "homeworld")
    }
  }


  return (
    <Card>
        <>
        <h3>{species.name}</h3>
        <ul>
            <li>Average height: {species["average_height"]}</li>
            <li>Eye colors: {species["eye_colors"]}</li>
            <li>Classification: {species.classification}</li>
            <li>Language: {species.language}</li>

            <button className='show-more-btn' onClick={toggleShowMore}>{showMore ? "Close" : "More info"}</button>
          {showMore ? 
          <>
            <h4>Homeworld</h4>
            {homeworldData ? 
            <>
              {homeworldData.map((el, index) => {
              return (
                <Link key={index} to={`/planet/${(el.url).match(/[0-9]+/)}`}>
                  <p>{el.name}</p>
                </Link> 
              )
            })}     
            </>
            : <p>No homeworld available</p>
          }

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

            <h4>Characters</h4>
            {peopleData.map((el, index) => {
                return <Link key={index} to={`/person/${(el.url).match(/[0-9]+/)}`}>
                          <p>{el.name}</p>
                      </Link> 
            })}
            
          </>
          : <></>
        }
        </ul>
        </>
    </Card>
  )
}

export default SpeciesDetail