import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Display = ({text}) => <div>{text}</div>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = () =>  (good - bad) / total
  const positivePercent = () => (good * 100) / total
  let content = <Display text="No feedback given" />

  if(total !== 0) {
    content = <>
      <Display text={`good ${good}`} />
      <Display text={`neutral ${neutral}`} />
      <Display text={`bad ${bad}`} />
      <Display text={`all ${total}`} />
      <Display text={`average ${average()}`} />
      <Display text={`positive ${positivePercent()} %`} />
    </>
  }

  return (
    <div>
      <h1>statistics</h1>
      {content}
    </div>
  )
}

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
