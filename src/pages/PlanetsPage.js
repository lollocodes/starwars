import React, {useState, useEffect} from 'react'
import PlanetDetail from '../components/detailsComponents/PlanetDetail';
import fetchData from '../logic/fetchData';
import { FaSearch } from 'react-icons/fa';

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
    console.log("handlesearch", searchField)
  }
   
  useEffect(() => {
    
    if(!localStorage.getItem("planets") || JSON.parse(localStorage.getItem("planets")).length === 0){
      console.log("We didnt have data in localstorage, a fetch will run")
      const getplanetsData = async () => {
        console.log("a fetch ran")
        const res = await fetchData("https://swapi.dev/api/planets/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('planets', JSON.stringify(res))
        localStorage.setItem('planetsNextPage', JSON.stringify(res.next))
      }
      getplanetsData()
    } else {
      console.log("we already have data in localstorage, a fetch will not run")
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
      <h2>Planets</h2>
      <input 
            className="search_input"
            type = "text" 
            placeholder = "Search Planets" 
            onChange={(e) => handleChange(e.target.value)}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>

      <div className='card-container'>
        {searchField ?
          <>
            {filteredList.map((el) => {
              return <PlanetDetail key={el.name} homeworld={el} />
            })}
          </>
          :
          <>
            {data.map((el) => {
                  return <PlanetDetail key={el.name} homeworld={el} />
            })}

          {data.length === 60 ? 
              <p>Your at the end</p>
            : <button className='load-more-btn' onClick={handleLoadButton}>Load more</button>}
          </>
        }
      </div>
    </div>
  )
}

export default PlanetsPage