import React, {useState, useEffect} from 'react'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';
import { FaSearch } from 'react-icons/fa';
import SpeciesDetail from '../components/detailsComponents/SpeciesDetail';

const Species = () => {
  const [searchField, setSearchField] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [data, setData] = useState([])
  const [next, setNext] = useState([])


  const handleSearch = () => {
    filterSearch("species", searchField).then(resfilms => {
      setFilteredList(resfilms.results)
    })
  }
   
  useEffect(() => {
    
    if(!localStorage.getItem("species") || JSON.parse(localStorage.getItem("species")).length === 0){
      console.log("We didnt have data in localstorage, a fetch will run")
      const getspeciesData = async () => {
        console.log("a fetch ran")
        const res = await fetchData("https://swapi.dev/api/species/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('species', JSON.stringify(res))
        localStorage.setItem('speciesNextPage', JSON.stringify(res.next))
      }
      getspeciesData()
    } else {
      console.log("we already have data in localstorage, a fetch will not run")
      let storedData = JSON.parse(localStorage.getItem('species'))
      let storedDataNext = JSON.parse(localStorage.getItem('speciesNextPage'))
      setData(storedData.results)
      setNext(storedDataNext)
    }
    
  }, [])


  // Load more data, show next page of API
  const handleLoadButton = async () => {
    console.log("next is: ", next)
    const res = await fetchData(next)
    
    setData([...data, ...res.results])
    setNext(res.next) 

    var existingEntries = JSON.parse(localStorage.getItem("species"));

    localStorage.setItem("species", JSON.stringify(res));
    localStorage.setItem("speciesNextPage", JSON.stringify(res.next));
    existingEntries.results.push(...res.results);
    localStorage.setItem("species", JSON.stringify(existingEntries));
  }


  return (
    <div>
      <h2>Species</h2>
      <input 
            className="search_input"
            type = "text" 
            placeholder = "Search species" 
            onChange={(e) => setSearchField(e.target.value)}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>

      <div className='card-container'>
        {searchField ?
          <>
            {filteredList.map((el) => {
              return <SpeciesDetail key={el.name} species={el} />
            })}
          </>
          :
          <>
            {data.map((el) => {
              return <SpeciesDetail key={el.name} species={el} />
            })}

          {data.length === 37 ? 
              <p>Your at the end</p>
            : <button className='load-more-btn' onClick={handleLoadButton}>Load more</button>}
          </>
        }
      </div>
    </div>
  )
}

export default Species