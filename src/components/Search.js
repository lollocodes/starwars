import React, {useState} from 'react'

const Search = ({people}) => {
  const [searchField, setSearchField] = useState("");

  const filteredPersons = people.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = (e) => {
    setSearchField(e.target.value)
  }
  return (
    <div>
      <input 
            className="search_input"
            type = "search" 
            placeholder = "Search People" 
            onChange = {handleChange}
        />
      {filteredPersons}
    </div>
  )
}

export default Search