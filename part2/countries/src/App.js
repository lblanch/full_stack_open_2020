import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [weather, setWeather] = useState({})
    
    const filteredCountries = countries.filter((country) => country.name.match(new RegExp(search,"i")))

    const handleSearchChange = (event) => setSearch(event.target.value)
    const handleCountryButton = (event) => setSearch(event.target.value)
    const handleRequestWeather = (capital) => {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
            .then((response) => setWeather(response.data))
    }
    const resetWeather = () => {
        if(Object.keys(weather).length !== 0) {
            setWeather({})
        }
    }
    
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
            .then((response) => setCountries(response.data))
    },[])

    return (
        <div>
            find countries <input value={search} onChange={handleSearchChange} />
            <Countries 
                countries={filteredCountries}
                weather={weather}
                handleCountryButton={handleCountryButton}
                handleRequestWeather={handleRequestWeather}
                resetWeather={resetWeather}
             />
        </div>
    )
}

export default App