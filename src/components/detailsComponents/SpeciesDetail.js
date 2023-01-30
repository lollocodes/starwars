import React, {useState, useEffect} from 'react'
import Card
 from '../../UI/Card'
 import retrieveList from '../../logic/retriveDataWithUrl';
 import getData from '../../logic/findData';


const SpeciesDetail = ({species}) => {
  const [showMore, setShowMore] = useState(false);
  const [filmsData, setFilmsData] = useState([]);
  const [people, setPeopleData] = useState([]);
  const [homeworldData, sethomeworldData] = useState(null);


  const getSpecificData = async (referenceName, dataToCollect, dataToSet) => {
    if(!localStorage.getItem(referenceName) || JSON.parse(localStorage.getItem(referenceName)).length === 0){
      const getCharacterData = async () => {
        let collectedData;
        if(dataToCollect === species.homeworld) {
          // let fetchData = await getData(species.homeworld)
          // if (fetchData === null) {
          //   collectedData = ""
          // } else {
          //   collectedData = fetchData
          // }
          collectedData = await getData(species.homeworld)
        } else {
          collectedData = await retrieveList(dataToCollect)
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
            {homeworldData === null ?   
            <>This species doesnt have a homeworld</>
            :
              <div>
                <p>{homeworldData.name}</p>
              </div>
            }

            <h4>Films</h4>
            {filmsData.map((el) => {
              return <div key={el.title}>
                  <p>{el.title}</p>
              </div>
            })}

            <h4>Characters</h4>
            {people.map((el) => {
              return <div key={el.name}>
                  <p>{el.name}</p>
              </div>
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