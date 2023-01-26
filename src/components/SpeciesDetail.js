import React from 'react'
import Card
 from '../UI/Card'

const SpeciesDetail = ({species}) => {
  return (
    <Card>
        {species.name ? 
        <>
        <h3>{species.name}</h3>
        <ul>
            <li>Average height: {species["average_height"]}</li>
            <li>Eye colors: {species["eye_colors"]}</li>
            <li>Classification: {species.classification}</li>
        </ul>
        </>
        : <p>There is no data</p>
        }
    </Card>
  )
}

export default SpeciesDetail