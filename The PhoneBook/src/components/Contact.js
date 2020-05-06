import React from 'react'

const Contact = ({ name, number, remove }) => {
    
    return (
        <tr>
            <td>
                {name} 
            </td>
            <td>
                {number}
            </td>
            <td>
                <button onClick={remove} >delete</button>
            </td>
        </tr>
    )
}

export default Contact