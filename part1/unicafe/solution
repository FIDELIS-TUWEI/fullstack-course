import { useState } from "react";
import Stats from "./Stats";


const Stats = ({ good, neutral, bad }) => {
    // function to calculate total stats
  const total = good + neutral + bad;

  // function to calculate positive feedback
  const positiveFeedback = (good / total) * 100;

  // function to calculate combined average score (good: 1, neutral: 0, bad: -1)
  const combinedAverage = 
    total > 0 ? (good * 1 + neutral * 0 + bad * -1) / total : 0;
  return (
    <div>
        {
            total > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>category</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Good</td>
                                <td>{good}</td>
                            </tr>
                            <tr>
                                <td>Neutral</td>
                                <td>{neutral}</td>
                                
                            </tr>
                            <tr>
                                <td>Bad</td>
                                <td>{bad}</td>

                            </tr>
                            <tr>
                                <td>Total Stats</td>
                                <td>{total}</td>

                            </tr>
                            <tr>
                                <td>Average Feedback</td>
                                <td>{combinedAverage.toFixed(2)}%</td>

                            </tr>
                            <tr>
                                <td>Positive Feedback</td>
                                <td>{positiveFeedback.toFixed(2)}%</td>

                            </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <p>No Feedback given.</p>
            )
        }
        
    </div>
  )
};


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