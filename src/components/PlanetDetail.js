import React from 'react'
import Card
 from '../UI/Card'

const PlanetDetail = ({homeworld}) => {
  return (
    <Card>
        <li>Name: {homeworld.name}</li>
        <li>Rotation period: {homeworld["rotation_period"]}</li>
        <li>Orbital period: {homeworld["orbital_period"]}</li>
        <li>Diameter: {homeworld.diameter}</li>
        <li>Climate: {homeworld.climate}</li>
        <li>Gravity: {homeworld.gravity}</li>
        <li>Terrain: {homeworld.terrain}</li>
    </Card>
  )
}

export default PlanetDetail