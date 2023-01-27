import fetchJson from './fetchJson'

function findData(url) {
    return fetchJson(url)
}

export default findData;