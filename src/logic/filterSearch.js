import fetchData from "./fetchData";


const filterSearch = async (endpoint, searchField) => {
    return await fetchData(`https://swapi.dev/api/${endpoint}/?search=${searchField}`)
  };

  export default filterSearch