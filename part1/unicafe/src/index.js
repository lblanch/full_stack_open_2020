import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Display = ({text}) => <div>{text}</div>

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = () => good + neutral + bad
  const average = () => {
    const totalValue = total()
    if (totalValue !== 0) {
      return (good - bad) / totalValue
    }
    return 0
  }
  const positivePercent = () => {
    const totalValue = total()
    if (totalValue !== 0) {
      return (good * 100) / totalValue
    }
    return 0
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <Display text={`good ${good}`} />
      <Display text={`neutral ${neutral}`} />
      <Display text={`bad ${bad}`} />
      <Display text={`all ${total()}`} />
      <Display text={`average ${average()}`} />
      <Display text={`positive ${positivePercent()} %`} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

