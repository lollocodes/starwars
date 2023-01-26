import React from 'react'
import Details from './PeopleDetails'

const List = ({people}) => {
  return (
    <div>
        {people.map(person => {
          return <Details key={person.name} person={person} />
        })}
    </div>
  )
}

export default List