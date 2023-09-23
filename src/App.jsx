import { useState } from "react";
import Stats from "./Stats";


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

  return (
    <div>
      <h2>Give feedback</h2>

      <div>
        <button onClick={handleGoodClicks}>Good</button>
        <button onClick={handleNeutralClicks}>Neutral</button>
        <button onClick={handleBadClicks}>Bad</button>
      </div>

      <h3>Statistics</h3>
      <Stats 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
