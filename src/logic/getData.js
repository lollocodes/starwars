import findData from './findData'

const getData = async (url) => {
    const res = await findData(url)
    return res
}

export default getData;