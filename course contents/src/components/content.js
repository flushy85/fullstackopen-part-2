import React from 'react'


const Content = ({parts}) => {
    

    const total = parts.reduce(function(total, curr){
        return total + curr.exercises
        
    },0)
    

    const part = () => parts.map(
        part => <p key={part.id}> {part.name} {part.exercises}</p>
    )

    return (
        <div>
            {part()}
            total of {total} exercises
        </div>
    )

    
}

export default Content