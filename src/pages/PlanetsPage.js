import React from 'react'

const PlanetsPage = ({data}) => {
  return (
    <div className='card-container'>
      <h2>Planets</h2>
      {data.map((el) => {
            return <div className='card' key={el.name}>{el.name}</div>
      })}
    </div>
  )
}

export default PlanetsPage