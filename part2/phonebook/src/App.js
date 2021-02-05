import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
    const [ persons, setPersons ] = useState([{ 
        name: 'Arto Hellas',
        number: '040-1234567'
    }]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleChangeName = (event) => setNewName(event.target.value)
    const handleChangeNumber = (event) => setNewNumber(event.target.value)
    const handleSubmit = (event) => {
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
            <form>
            <div>
                <div>name: <input value={newName} onChange={handleChangeName} /></div>
                <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => <Person key={person.name} person={person}/>)}
        </div>
    )
}

export default App