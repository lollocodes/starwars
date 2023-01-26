import React from 'react'
import FilmDetails from '../components/FilmDetails'

const HomePage = ({data}) => {

  return (
    <div>
        <h2>Films</h2>
        {data.map((el) => {
            return <FilmDetails key={el.title} film={el} />
      })}
    </div>
  )
}

export default HomePage