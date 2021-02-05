import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-1234567'},
    ]) 
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

    return (
        <div>
            <h2>Phonebook</h2>
            <div>filter shown with <input value={filter} onChange={handleChangeFilter} /></div>
            <h1>add a new entry</h1>
            <form>
                <div>name: <input value={newName} onChange={handleChangeName} /></div>
                <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
                <div>
                    <button type="submit" onClick={handleAddPersonClick}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filteredPersons.map((person) => <Person key={person.name} person={person}/>)}
        </div>
    )
}

export default App