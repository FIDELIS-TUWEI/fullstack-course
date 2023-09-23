import { useState } from "react"


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // function to handleGoodClicks
  const handleGoodClicks = () => {
    setGood(good + 1)
  };

  // function to handleNeutralClicks
  const handleNeutralClicks = () => {
    setNeutral(neutral + 1)
  };

  // function to handleBadClicks
  const handleBadClicks = () => {
    setBad(bad + 1)
  };

  // function to calculate total stats
  const total = good + neutral + bad;

  // function to calculate positive feedback
  const positiveFeedback = (good / total) * 100;

  // function to calculate combined average score (good: 1, neutral: 0, bad: -1)
  const combinedAverage = 
    total > 0 ? (good * 1 + neutral * 0 + bad * -1) / total : 0;

  return (
    <div>
      <h2>Give feedback</h2>

      <div>
        <button onClick={handleGoodClicks}>Good</button>
        <button onClick={handleNeutralClicks}>Neutral</button>
        <button onClick={handleBadClicks}>Bad</button>
      </div>

      <h3>Statistics</h3>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total Stats: {total}</p>
      <p>Average Feedback = {combinedAverage} %</p>
      <p>Positive Feedback = {positiveFeedback} %</p>
    </div>
  )
}

export default App
