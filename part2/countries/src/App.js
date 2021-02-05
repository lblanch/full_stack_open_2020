import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    
    const filteredCountries = countries.filter((country) => country.name.match(new RegExp(search,"i")))

    const handleSearchChange = (event) => setSearch(event.target.value)
    const handleCountryButton = (event) => setSearch(event.target.value)
    
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
            .then((response) => setCountries(response.data))
    },[])

    return (
        <div>
            find countries <input value={search} onChange={handleSearchChange} />
            <Countries countries={filteredCountries} handleCountryButton={handleCountryButton} />
        </div>
    )
}

export default App