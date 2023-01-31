import React, {useState, useEffect} from 'react'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';
import { FaSearch } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Card from '../UI/Card';

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
      const getPeopleData = async () => {
        const res = await fetchData("https://swapi.dev/api/people/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('people', JSON.stringify(res))
        localStorage.setItem('peopleNextPage', JSON.stringify(res.next))
      }
      getPeopleData()
    } else {
      let storedData = JSON.parse(localStorage.getItem('people'))
      let storedDataNext = JSON.parse(localStorage.getItem('peopleNextPage'))
      setData(storedData.results)
      setNext(storedDataNext)
    }
  }, [])

  // Load more data, show next page of API
  const handleLoadButton = async () => {
    const res = await fetchData(next)
    
    setData([...data, ...res.results])
    setNext(res.next) 

    var existingEntries = JSON.parse(localStorage.getItem("people"));

    localStorage.setItem("people", JSON.stringify(res));
    localStorage.setItem("peopleNextPage", JSON.stringify(res.next));
    existingEntries.results.push(...res.results);
    localStorage.setItem("people", JSON.stringify(existingEntries));
  }

  return (
    <div>
      <h2 className='page-title'>People</h2>
      {/* <input 
            className="search_input"
            type = "text" 
            placeholder = "Search People" 
            onChange={(e) => setSearchField(e.target.value)}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>

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
        </div> */}

        <input 
            className="search_input"
            type = "text" 
            placeholder = "Search People" 
            onChange={(e) => setSearchField(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>
        <div className='card-container'>
          {searchField ?
            <>
              {filteredList.map((el, index) => {
                return (
                  <Link key={index} to={`/person/${(el.url).match(/[0-9]+/)}`}>
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
            {data.map((el, index) => {
                return (
                  <Link key={index} to={`/person/${(el.url).match(/[0-9]+/)}`}>
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
          {data.length === 80 ? 
              <p>Your at the end</p>
            : <button className='load-more-btn' onClick={handleLoadButton}>Load more</button>
          }
    </div>
  )
}

export default PeoplePage