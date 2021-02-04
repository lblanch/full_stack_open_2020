import React from 'react'
import ReactDOM from 'react-dom'

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

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))