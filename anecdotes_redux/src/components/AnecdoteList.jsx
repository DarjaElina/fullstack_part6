import { useEffect } from 'react'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const anecdotes = useSelector(({ anecdotes, filter}) => {
    return [...anecdotes].sort((a, b) => (b.votes - a.votes)).filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  
  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(voteFor(updatedAnecdote))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <>
    <Notification/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList