import React from 'react'

const Person = ({person, handleDelete}) => (
    <div>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
    </div>
)

const Persons = ({persons, handleDelete}) => (
    persons.map((person) => (
        <Person key={person.name} person={person} handleDelete={handleDelete} />
    ))
)

export default Persons