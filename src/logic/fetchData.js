import fetchJson from "./fetchJson";

const fetchData = async (url) => {
    const response = await fetchJson(url);
    return response;
  }

  export default fetchData;