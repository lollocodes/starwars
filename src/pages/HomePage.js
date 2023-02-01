import React, {useState, useEffect} from 'react'
import fetchData from '../logic/fetchData';
import filterSearch from '../logic/filterSearch';
import { FaSearch } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Card from '../UI/Card';

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
      // console.log("We didnt have data in localstorage, a fetch will run")
      const getfilmsData = async () => {
        // console.log("a fetch ran")
        const res = await fetchData("https://swapi.dev/api/films/?page=1")
        setData(res.results)
        setNext(res.next)
        localStorage.setItem('films', JSON.stringify(res))
      }
      getfilmsData()
    } else {
      // console.log("we already have data in localstorage, a fetch will not run")
      let storedData = JSON.parse(localStorage.getItem('films'))
      setData(storedData.results)
      setNext(storedData.next)
    }
    
  }, [])

  return (
    <div>
        <h2 className='page-title'>Films</h2>
        <input 
            className="search_input"
            type = "text" 
            placeholder = "Search films" 
            onChange={(e) => setSearchField(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}
            value={searchField} />
        <button className='search-btn' onClick={handleSearch}><FaSearch /></button>

        <div className='card-container'>
      {searchField ?
        <>
          {filteredList.map((el, index) => {
            // return <FilmDetails key={el.title} film={el} />
            return (
                  <Link key={index} to={`/film/${(el.url).split("/").slice(-2).join("")}`}>
                      <Card>
                        <div className='card-title'>
                          <h3>{el.title}</h3>
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
            // return <FilmDetails key={el.title} film={el} />
            return (
              <Link key={index} to={`/film/${(el.url).match(/[0-9]+/)}`}>
                      <Card>
                      <div className='card-title'>
                          <h3>{el.title}</h3>
                          <i className='arrow'><BsArrowRight /></i>
                        </div>
                      </Card>
                  </Link>
            )
          })}

       


        </>
      }
      </div>
      {data.length === 6 ? 
         <p>Your at the end</p>
       : <></>
       }
    </div>
  )
}

export default HomePage