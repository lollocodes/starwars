import React from 'react'
import Card
 from '../UI/Card'

const VehiclesDetails = ({vehicle}) => {
  return (
    <Card>
        <h3>{vehicle.name}</h3>
        <ul>
            <li>Model: {vehicle.model}</li>
            <li>Manufacturer: {vehicle.manufacturer}</li>
        </ul>
    </Card>
  )
}

export default VehiclesDetails