import React, {useState, useEffect} from 'react'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';
import { FaSearch } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Card from '../UI/Card';

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
      const getspeciesData = async () => {
        const res = await fetchData("https://swapi.dev/api/species/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('species', JSON.stringify(res))
        localStorage.setItem('speciesNextPage', JSON.stringify(res.next))
      }
      getspeciesData()
    } else {
      let storedData = JSON.parse(localStorage.getItem('species'))
      let storedDataNext = JSON.parse(localStorage.getItem('speciesNextPage'))
      setData(storedData.results)
      setNext(storedDataNext)
    }
    
  }, [])

  // Load more data, show next page of API
  const handleLoadButton = async () => {
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
      <h2 className='page-title'>Species</h2>
      <input 
            className="search_input"
            type = "text" 
            placeholder = "Search species" 
            onChange={(e) => setSearchField(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>

      <div className='card-container'>
        {searchField ?
          <>
            {filteredList.map((el, index) => {
              return (
                <Link key={index} to={`/specie/${(el.url).match(/[0-9]+/)}`}>
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
              return <SpeciesDetail key={el.name} species={el} />
            })} */}

            {data.map((el, index) => {
                return (
                  <Link key={index} to={`/specie/${(el.url).split("/").slice(-2).join("")}`}>
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
        {data.length === 37 ? 
            <p>Your at the end</p>
          : <button className='load-more-btn' onClick={handleLoadButton}>Load more</button>}
    </div>
  )
}

export default Species