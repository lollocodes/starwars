import getData from "./getData"

const retrieveDataList = async (array) => {
  let dataList = []
  for (let url of array) {
    dataList = [...dataList, await getData(url)]
  }
  return dataList
}

export default retrieveDataList