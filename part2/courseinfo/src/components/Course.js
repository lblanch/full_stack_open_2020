import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }
  const Header = ({name}) => <h2>{name}</h2>
  
  const Content = ({parts}) => (
    <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  )
  
  const Part = ({part}) => <p>{part.name} {part.exercises}</p> 
  
  const Total = ({parts}) => <p><b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>

  export default Course