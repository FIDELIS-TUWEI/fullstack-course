import { useState } from "react"


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // function to handleGoodClicks
  const handleGoodClicks = () => {
    setGood(good + 1)
  };

  return (
    <div>
      <h2>Give feedback</h2>

      <div>
        <button onClick={handleGoodClicks}>Good</button>
        <button>Neutral</button>
        <button>Bad</button>
      </div>

      <h3>Statistics</h3>
      <p>Good {good}</p>
      <p>Neutral</p>
      <p>Bad</p>
    </div>
  )
}

export default App
