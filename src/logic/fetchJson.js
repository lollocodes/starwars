function fetchJson(url) {
    return fetch(url).then(resp => resp.json());
}

export default fetchJson;