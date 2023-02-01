import React, {useState, useEffect} from 'react'
import fetchData from '../logic/fetchData';
import { FaSearch } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Card from '../UI/Card';

const PlanetsPage = () => {
  const [searchField, setSearchField] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [data, setData] = useState([])
  const [next, setNext] = useState([])

  // -----SEARCH ----//
  const filteredPersons = async (searchField) => {
    await fetchData(`https://swapi.dev/api/planets/?search=${searchField}`)
    .then(resPlanets => {
      setFilteredList(resPlanets.results)
    })
  };

  const handleChange = (e) => {
    setSearchField(e)
  }

  const handleSearch = () => {
    filteredPersons(searchField)
  }
   
  useEffect(() => {
    
    if(!localStorage.getItem("planets") || JSON.parse(localStorage.getItem("planets")).length === 0){
      const getplanetsData = async () => {
        const res = await fetchData("https://swapi.dev/api/planets/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('planets', JSON.stringify(res))
        localStorage.setItem('planetsNextPage', JSON.stringify(res.next))
      }
      getplanetsData()
    } else {
      let storedData = JSON.parse(localStorage.getItem('planets'))
      let storedDataNext = JSON.parse(localStorage.getItem('planetsNextPage'))
      setData(storedData.results)
      setNext(storedDataNext)
    }
    
  }, [])


  // Load more data, show next page of API
  const handleLoadButton = async () => {
    const res = await fetchData(next)
    
    setData([...data, ...res.results])
    setNext(res.next) 

    var existingEntries = JSON.parse(localStorage.getItem("planets"));

    localStorage.setItem("planets", JSON.stringify(res));
    localStorage.setItem("planetsNextPage", JSON.stringify(res.next));
    existingEntries.results.push(...res.results);
    localStorage.setItem("planets", JSON.stringify(existingEntries));
  }

  return (
    <div>
      <h2 className='page-title'>Planets</h2>
      <input 
            className="search_input"
            type = "text" 
            placeholder = "Search Planets" 
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>

      <div className='card-container'>
        {searchField ?
          <>
            {/* {filteredList.map((el) => {
              return <PlanetDetail key={el.name} homeworld={el} />
            })} */}
            {filteredList.map((el, index) => {
            return (
                  <Link key={index} to={`/planet/${(el.url).split("/").slice(-2).join("")}`}>
                      <Card>
                      <div className='card-title'>
                          <h3>{el.name}</h3>
                          <i className='arrow'><BsArrowRight /></i>
                        </div>
                      </Card>
                  </Link>
            )
          })}
          </>
          :
          <>
            {/* {data.map((el) => {
                  return <PlanetDetail key={el.name} homeworld={el} />
            })} */}
            {data.map((el, index) => {
            return (
                  <Link key={index} to={`/planet/${(el.url).match(/[0-9]+/)}`}>
                      <Card>
                      <div className='card-title'>
                          <h3>{el.name}</h3>
                          <i className='arrow'><BsArrowRight /></i>
                        </div>
                      </Card>
                  </Link>
            )
          })}

          </>
        }
      </div>
        {data.length === 60 ? 
            <p>Your at the end</p>
          : <button className='load-more-btn' onClick={handleLoadButton}>Load more</button>
        }
    </div>
  )
}

export default PlanetsPage