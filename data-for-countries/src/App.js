import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

function App() {
  
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')  
  const [details, setDetails] = useState('')
  const [selected, setSelected] = useState(false)
  
  
 
  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }
  
  useEffect(hook, [])
  
  
  const handleChange = (e) => {
	setSearch(e.target.value)
	setSelected(false)
  }
  const myMatch = selected 
				  ? details 
				  : new RegExp(`${search}`, 'i')
  
  
  const searchCountries = countries.filter(country => country.name.match(myMatch))
  
  
  const countryList = () => searchCountries.map(country =>
		<CountryList
		key={country.name}
		country={country.name}
		setDetails={setDetails}
		setSelected={setSelected}
		/>
  )

  const countryDetails = () => searchCountries.map(country =>
    <CountryDetails
      key={country.name}
	  country={country.name}
	  population={country.population}
	  flag={country.flag}
	  capital={country.capital}
	  languages={country.languages}
    />
  )
  
  return (
	<div className="container">
    	<div className="searchBox">
			find Countries:
			<br/> 
			<input type="text" onChange={handleChange}></input>
			<br/>
		</div>	
		<table className="table">
			{searchCountries.length >= 10 
			? 'Too many results, refine search' 
			: searchCountries.length !== 1
			? countryList()
			: countryDetails()
			}
		</table>
		
    </div>
  );
}

export default App;
