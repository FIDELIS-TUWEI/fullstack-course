
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
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total Stats: {total}</p>
        <p>Average Feedback = {combinedAverage} %</p>
        <p>Positive Feedback = {positiveFeedback} %</p>
    </div>
  )
}

export default Stats