import React, {useState, useEffect} from 'react'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';

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
      }
      getspeciesData()
    } else {
      console.log("we already have data in localstorage, a fetch will not run")
      let storedData = JSON.parse(localStorage.getItem('species'))
      setData(storedData.results)
      setNext(storedData.next)
    }
    
  }, [])


  // Load more data, show next page of API
  const handleLoadButton = async () => {
    const res = await fetchData(next)
    setData([...data, ...res.results])
    setNext(res.next)
    console.log("New data: ", data)
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
        <button className='search-btn' onClick={handleSearch}>Search</button>

      <div className='card-container'>
        {searchField ?
          <>
            {filteredList.map((el) => {
              return <div className='card' key={el.name}>{el.name}</div>
            })}
          </>
          :
          <>
            {data.map((el) => {
              return <div className='card' key={el.name}>{el.name}</div>
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