import React from 'react'
import Card
 from '../UI/Card'

const StarshipDetail = ({starship}) => {
  return (
    <Card>
        <h3>{starship.name}</h3>
        <ul>
            <li>Hyperdrive rating: {starship["hyperdrive_rating"]}</li>
            <li>Starship class: {starship["starship_class"]}</li>
        </ul>
    </Card>
  )
}

export default StarshipDetail