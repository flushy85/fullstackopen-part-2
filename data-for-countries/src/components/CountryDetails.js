import React, { useEffect, useState } from 'react';
import LanguageList from './Languages';
import axios from 'axios';

const CountryDetails = (props) => {
	const [location, setLocation] = useState([])
	const [weather, setWeather] = useState([])

	let config = {
		params: {'access_key': 'fa7061496ebde0e93a897c5d39867736',
		'query': `${props.country}`
		}
	  }
		
		const newHook = () => {
		axios
			.get('http://api.weatherstack.com/current', config)
				.then(response => {
					setWeather(response.data.current)
					setLocation(response.data.location)
				})
		}
	
		useEffect(newHook, [])
		
		console.log(weather)
	
	const languageList = () => props.languages.map(obj =>
		<LanguageList
		  key={obj.name}
		  name={obj.name}
		/>
	  )

	return (
        <div>
            <h1>{props.country}</h1>
            <p>Capital: {props.capital}</p>
            <p>Population: {props.population}</p>
            <h2>Languages</h2>
            <ul>
                {languageList()}
            </ul>
            <img src={props.flag} alt="countryflag" className="image"></img>
			<br/>
			<h2>Weather in {location.name}</h2>
			<br/>
			<p>temperature: {weather.temperature} Celcius </p>
			<br/>
			<img className="weatherIcon" src={weather.weather_icons} alt={weather.weather_descriptions}></img>
			<p> <b>Wind:</b> {weather.wind_speed} kph, direction {weather.wind_dir} </p>
        </div>
    )
}

export default CountryDetails