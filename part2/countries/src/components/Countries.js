import React, { useState } from 'react'

const Weather = ({weather}) => {
    if(Object.keys(weather).length === 0) {
        return <p>No weather information available</p>
    }

    return (
        <div>
            <div><b>temperature:</b> {weather.current.temperature} Celsius</div>
            <div>{weather.current.weather_icons.map((icon) => <img key={icon} width='50px' src={icon}/>)}</div>
            <div><b>wind:</b> {weather.current.wind_speed} Kilometers/Hour <b>direcction</b> {weather.current.wind_dir}</div>
        </div>
    )
}

const Country = ({country, weather}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
                {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width='100px' />
            <h3>Weather in {country.capital}</h3>
            <Weather weather={weather}/>
        </div>
    )
}

const Countries = ({countries, weather, handleCountryButton, handleRequestWeather, resetWeather}) => {
    if (countries.length === 0) {
        resetWeather()
        return <p>No countries match the filter</p>
    }

    if (countries.length > 10) {
        resetWeather()
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
        resetWeather()
        return (
            <div>{countries.map((country) => (
                    <div key={country.name}>
                        {country.name} 
                        <button value={country.name} onClick={handleCountryButton}>show</button>
                    </div>
            ))}</div>
        )
    }

    if(Object.keys(weather).length === 0) {
        handleRequestWeather(countries[0].capital)
    }

    return <Country country={countries[0]} weather={weather} />
}

export default Countries