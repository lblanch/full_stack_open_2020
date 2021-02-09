import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ type, setType ] = useState('info')
    const filteredPersons = persons.filter((person) => person.name.match(new RegExp(filter,"i")))

    const showInfoMessage = (message) => {
        setType('info')
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }

    const showErrorMessage = (message) => {
        setType('error')
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }

    const handleChangeName = (event) => setNewName(event.target.value)
    const handleChangeNumber = (event) => setNewNumber(event.target.value)
    const handleChangeFilter = (event) => setFilter(event.target.value)
    const handleDelete = (id, name) => {
        if(window.confirm(`Delete ${name}?`)) {
            personsService.deletePerson(id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== id))
                    showInfoMessage(`Deleted ${name}`)
                })
                .catch(error => {
                    showErrorMessage(`There was an error deleting ${name}!`)
                })
        }
    }
    const handleAddPersonClick = (event) => {
        event.preventDefault()
        
        const newPerson = { 
            name: newName,
            number: newNumber
        }

        const foundPerson = persons.find((person) => person.name === newName)
        if (foundPerson !== undefined) {
            if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                return
            }
            personsService.updatePerson(newPerson, foundPerson.id)
                .then(response => {
                    setPersons(persons.map(person => person.id !== foundPerson.id ? person : response))
                    setNewName('')
                    setNewNumber('')
                    showInfoMessage(`Updated ${response.name}`)
                })
                .catch(error => {
                    showErrorMessage(`There was an error updating ${newPerson.name}!`)
                })

            return
        }

        personsService.createPerson(newPerson)
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
                showInfoMessage(`Added ${response.name}`)
            })
            .catch(error => {
                showErrorMessage(`There was an error adding ${newPerson.name}!`)
            })
    }

    useEffect(() => personsService.getAll().then(response => setPersons(response)), [])

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} type={type} />
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
            <Persons persons={filteredPersons} handleDelete={handleDelete} />
        </div>
    )
}

export default App