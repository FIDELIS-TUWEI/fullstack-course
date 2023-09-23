
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

export default Stats;