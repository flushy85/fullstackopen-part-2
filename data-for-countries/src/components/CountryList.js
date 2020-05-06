import React from 'react'

const CountryList = (props) => {
	
	const handleClick = () => {
		props.setSelected(true)
		props.setDetails(props.country)
	}
	
    return (
      <tr>
      	<td>{props.country}</td>
	  	<td><button onClick={handleClick}>show</button></td>
	</tr>
    )
}

export default CountryList