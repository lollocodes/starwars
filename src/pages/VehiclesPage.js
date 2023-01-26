import React from 'react'

const Vehicles = ({data}) => {
  return (
    <div className='card-container'>
      <h2>Vehicles</h2>
      {data.map((el) => {
            return <div className='card' key={el.name}>{el.name}</div>
      })}
    </div>
  )
}

export default Vehicles