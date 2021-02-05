import React from 'react'

const Country = ({country}) => (
    <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
            {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
        <img src={country.flag} width='100px' />
    </div>
)

const Countries = ({countries, handleCountryButton}) => {
    if (countries.length === 0) {
        return <p>No countries match the filter</p>
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
        return (
            <div>{countries.map((country) => (
                    <div key={country.name}>
                        {country.name} 
                        <button value={country.name} onClick={handleCountryButton}>show</button>
                    </div>
            ))}</div>
        )
    }

    return <Country country={countries[0]} />
}

export default Countries