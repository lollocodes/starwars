import React, {useState, useEffect} from 'react'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';
import { FaSearch } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Card from '../UI/Card';

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
      const getstarshipsData = async () => {
        const res = await fetchData("https://swapi.dev/api/starships/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('starships', JSON.stringify(res))
        localStorage.setItem('starshipsNextPage', JSON.stringify(res.next))
      }
      getstarshipsData()
    } else {
      let storedData = JSON.parse(localStorage.getItem('starships'))
      let storedDataNext = JSON.parse(localStorage.getItem('starshipsNextPage'))
      setData(storedData.results)
      setNext(storedDataNext)
    }
    
  }, [])

  // Load more data, show next page of API
  const handleLoadButton = async () => {
    const res = await fetchData(next)
    
    setData([...data, ...res.results])
    setNext(res.next) 

    var existingEntries = JSON.parse(localStorage.getItem("starships"));

    localStorage.setItem("starships", JSON.stringify(res));
    localStorage.setItem("starshipsNextPage", JSON.stringify(res.next));
    existingEntries.results.push(...res.results);
    localStorage.setItem("starships", JSON.stringify(existingEntries));
  }

  return (
    <div>
      <h2 className='page-title'>Starships</h2>
      <input 
            className="search_input"
            type = "text" 
            placeholder = "Search starships" 
            onChange={(e) => setSearchField(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>
        <div className='card-container'>
        {searchField ?
        <>
          {/* {filteredList.map((el) => {
            return <StarshipDetail key={el.name} starship={el}/>
          })} */}
          {filteredList.map((el, index) => {
                return (
                  <Link key={index} to={`/starship/${(el.url).match(/[0-9]+/)}`}>
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
            return <StarshipDetail key={el.name} starship={el}/>
          })}  */}

            {data.map((el, index) => {
                return (
                  <Link key={index} to={`/starship/${(el.url).match(/[0-9]+/)}`}>
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
      {data.length === 36 ? 
         <p>Your at the end</p>
       : <button className='load-more-btn' onClick={handleLoadButton}>Load more</button>
       }
      
    </div>
  )
}

export default Starships