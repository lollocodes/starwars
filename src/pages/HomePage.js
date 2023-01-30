import React, {useState, useEffect} from 'react'
import FilmDetails from '../components/detailsComponents/FilmDetails'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';
import { FaSearch } from 'react-icons/fa';


const HomePage = () => {
  const [searchField, setSearchField] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [data, setData] = useState([])
  const [next, setNext] = useState([])

  const handleSearch = () => {
    filterSearch("films", searchField).then(resfilms => {
      setFilteredList(resfilms.results)
    })
  }

  useEffect(() => {
    if(!localStorage.getItem("films") || JSON.parse(localStorage.getItem("films")).length === 0){
      console.log("We didnt have data in localstorage, a fetch will run")
      const getfilmsData = async () => {
        console.log("a fetch ran")
        const res = await fetchData("https://swapi.dev/api/films/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('films', JSON.stringify(res))
      }
      getfilmsData()
    } else {
      console.log("we already have data in localstorage, a fetch will not run")
      let storedData = JSON.parse(localStorage.getItem('films'))
      setData(storedData.results)
      setNext(storedData.next)
    }
    
  }, [])

  return (
    <div>
        <h2>Films</h2>
        <input 
            className="search_input"
            type = "text" 
            placeholder = "Search films" 
            onChange={(e) => setSearchField(e.target.value)}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>

        <div className='card-container'>
      {searchField ?
        <>
          {filteredList.map((el) => {
            return <FilmDetails key={el.title} film={el} />
          })}
        </>
        :
        <>
          {data.map((el) => {
            return <FilmDetails key={el.title} film={el} />
      })}

         {data.length === 6 ? 
            <p>Your at the end</p>
          : <></>}
        </>
      }
      </div>
            

    </div>
  )
}

export default HomePage