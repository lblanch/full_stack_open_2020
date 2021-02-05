import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
    const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }]) 
    const [ newName, setNewName ] = useState('')

    const handleChangeValue = (event) => setNewName(event.target.value)
    const handleSubmit = (event) => {
        event.preventDefault()
        
        if(persons.find((person) => person.name === newName) !== undefined) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        const newPerson = { name: newName }
        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
            <div>
                name: <input value={newName} onChange={handleChangeValue}/>
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