function fetchJson(url) {
    return fetch(url).then(resp => resp.json());
  }

function findData(url) {
    return fetchJson(url)
}

export default findData;