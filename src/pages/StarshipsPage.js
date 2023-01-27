import React, {useState, useEffect} from 'react'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';

const Starships = () => {
  const [searchField, setSearchField] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [data, setData] = useState([])
  const [next, setNext] = useState([])

  const handleSearch = () => {
    filterSearch("starships", searchField).then(resstarships => {
      setFilteredList(resstarships.results)
    })
  }
   
  useEffect(() => {
    if(!localStorage.getItem("starships") || JSON.parse(localStorage.getItem("starships")).length === 0){
      console.log("We didnt have data in localstorage, a fetch will run")
      const getstarshipsData = async () => {
        console.log("a fetch ran")
        const res = await fetchData("https://swapi.dev/api/starships/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('starships', JSON.stringify(res))
      }
      getstarshipsData()
    } else {
      console.log("we already have data in localstorage, a fetch will not run")
      let storedData = JSON.parse(localStorage.getItem('starships'))
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
      <h2>Starships</h2>
      <input 
            className="search_input"
            type = "text" 
            placeholder = "Search starships" 
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

         {data.length === 36 ? 
            <p>Your at the end</p>
          : <button className='load-more-btn' onClick={handleLoadButton}>Load more</button>}
        </>
      }
        </div>
      
    </div>
  )
}

export default Starships