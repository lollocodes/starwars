import React, {useState, useEffect} from 'react'
import Card
 from '../UI/Card'


import retrieveList from '../logic/retriveDataWithUrl';


const FilmDetails = ({film}) => {
  const [showMore, setShowMore] = useState(false);
  const [characterData, setCharacterData] = useState([]);

  // useEffect(() => {
      
  // }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore)

    const getCharacterData = async () => {
      const dataCharacters = await retrieveList(film.characters)
      setCharacterData(dataCharacters)
    }

    getCharacterData()
  }

  return (
    <Card>
        <h3>{film.title}</h3>
        <ul>
            <li>Created: {film.created}</li>
            <li>Director: {film.director}</li>

            <button onClick={toggleShowMore}>{showMore ? "Close characters" : "show characters"}</button>
          {showMore ? 
          <>
            <h4>Characters</h4>
            {characterData.map((el) => {
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

export default FilmDetails