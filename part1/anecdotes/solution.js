import { useEffect } from "react";
import { useState } from "react"


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  // function to generate a random anecdote
  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex)
  };

  // useeffect hook
  useEffect(() => {
    getRandomAnecdote()
  }, []);

   // function to handle votes
   const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes)
  }

  // function to display anecdote with the largest votes
  const anecdoteWithMostVotes = () => {
    let maxVotes = -1;
    let maxIndex = -1;

    for (let i =0; i < votes.length; i++) {
      if (votes[i] > maxVotes) {
        maxVotes = votes[i];
        maxIndex = i;
      }
    }

    if (maxIndex !== -1) {
      return {
        text: anecdotes[maxIndex],
        votes: maxVotes
      };
    }

    return {
      text: "No Votes submitted yet.",
      votes: 0
    }
  }

  const mostVotedAnecdote = anecdoteWithMostVotes();

  return (
    <div>
      <h4>Anecdote of the day</h4>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={getRandomAnecdote}>next anecdote</button>


      <h4>AnecDote with most votes</h4>
      <p>{mostVotedAnecdote.text}</p>
      <p>Has Total of {mostVotedAnecdote.votes} votes</p>
    </div>
  )
}

export default App