import React, {useState} from 'react'

const Species = ({data}) => {
  

  return (
    <div className='card-container'>
      <h2>Species</h2>
      {data.map((el) => {
            return <div className='card' key={el.name}>
            {el.name}

             
              
              
              </div>
      })}
    </div>
  )
}

export default Species