import React, {useState} from 'react'
import PeopleDetails from '../components/PeopleDetails'

const PeoplePage = ({data}) => {
  const [searchField, setSearchField] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const filteredPersons = () => {
    let dataCopy = [...data];
    dataCopy = dataCopy.filter((person => {
      return person.name.toLowerCase().includes(searchField.toLowerCase());
    }))

    setFilteredList(dataCopy)
  };

  const handleChange = (e) => {
    setSearchField(e.target.value)
    filteredPersons()
  }

  return (
    <div className='card-container'>
      <h2>People</h2>
      <input 
            className="search_input"
            type = "search" 
            placeholder = "Search People" 
            onChange = {handleChange}
        />

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
        </>
      }

      
      
    </div>
  )
}

export default PeoplePage