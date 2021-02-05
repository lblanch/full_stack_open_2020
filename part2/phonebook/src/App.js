import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const filteredPersons = persons.filter((person) => person.name.match(new RegExp(filter,"i")))

    const handleChangeName = (event) => setNewName(event.target.value)
    const handleChangeNumber = (event) => setNewNumber(event.target.value)
    const handleChangeFilter = (event) => setFilter(event.target.value)
    const handleAddPersonClick = (event) => {
        event.preventDefault()
        
        if(persons.find((person) => person.name === newName) !== undefined) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        const newPerson = { 
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }

    useEffect(() => {
        axios.
            get('http://localhost:3001/persons').
            then((response) => setPersons(response.data))
    }, [])

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
            <h2>add a new entry</h2>
            <PersonForm 
                newName={newName}
                newNumber={newNumber}
                handleChangeName={handleChangeName}
                handleChangeNumber={handleChangeNumber}
                handleAddPersonClick={handleAddPersonClick}
            />
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} />
        </div>
    )
}

export default App