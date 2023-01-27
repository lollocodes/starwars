import React from 'react'
import Card
 from '../UI/Card'

const PlanetDetail = ({homeworld}) => {
  return (
    <Card>
      <ul>
        <h3>{homeworld.name}</h3>
        <li>Rotation period: {homeworld["rotation_period"]}</li>
        <li>Orbital period: {homeworld["orbital_period"]}</li>
        <li>Diameter: {homeworld.diameter}</li>
        <li>Climate: {homeworld.climate}</li>
        <li>Gravity: {homeworld.gravity}</li>
        <li>Terrain: {homeworld.terrain}</li>
      </ul>
    </Card>
  )
}

export default PlanetDetail