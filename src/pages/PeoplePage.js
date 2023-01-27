import React, {useState, useEffect} from 'react'
import PeopleDetails from '../components/PeopleDetails'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';

const PeoplePage = () => {
  const [searchField, setSearchField] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [data, setData] = useState([])
  const [next, setNext] = useState([])

  const handleSearch = () => {
    filterSearch("people", searchField).then(resfilms => {
      setFilteredList(resfilms.results)
    })
  }
   
  useEffect(() => {
    
    if(!localStorage.getItem("people") || JSON.parse(localStorage.getItem("people")).length === 0){
      console.log("We didnt have data in localstorage, a fetch will run")
      const getPeopleData = async () => {
        console.log("a fetch ran")
        const res = await fetchData("https://swapi.dev/api/people/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('people', JSON.stringify(res))
      }
      getPeopleData()
    } else {
      console.log("we already have data in localstorage, a fetch will not run")
      let storedData = JSON.parse(localStorage.getItem('people'))
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

    var existingEntries = JSON.parse(localStorage.getItem("people"));

    localStorage.setItem("people", JSON.stringify(res));
    // Save allEntries back to local storage
    existingEntries.results.push(...res.results);
    localStorage.setItem("people", JSON.stringify(existingEntries));
  }



  return (
    <div>
      <h2>People</h2>
      <input 
            className="search_input"
            type = "text" 
            placeholder = "Search People" 
            onChange={(e) => setSearchField(e.target.value)}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}>Search</button>

        <div className='card-container'>
          {searchField ?
            <>
              {filteredList.map((el) => {
                return <PeopleDetails key={el.name} person={el} />
              })}
            </>
            :
            <>
              {data.map((el) => {
                    return <PeopleDetails key={el.name} person={el} />
              })}

            {data.length === 80 ? 
                <p>Your at the end</p>
              : <button className='load-more-btn' onClick={handleLoadButton}>Load more</button>}
            </>
          }
        </div>
            
    </div>
  )
}

export default PeoplePage