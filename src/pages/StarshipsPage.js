import React from 'react'

const Starships = ({data}) => {
  return (
    <div className='card-container'>
      <h2>Starships</h2>
      {data.map((el) => {
            return <div className='card' key={el.name}>{el.name}</div>
      })} 
    </div>
  )
}

export default Starships