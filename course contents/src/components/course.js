import React from 'react'
import Header from './header'
import Content from './content'


const Courses = ({courses}) => {
 
    const course = () => courses.map(
      (course) => 
        <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>

    )
    return (
        <div>
            {course()}
        </div>
    )
}

export default Courses