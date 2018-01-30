import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: this.initialPointsObject()
    }
  }

  initialPointsObject = () => {
    const points = {}
    for (let i = 0; i < this.props.anecdotes.length; i++) {
      points[i] = 0
    }
    return points
  }

  selectRandomAnecdote = () => {
    const min = 0
    const max = this.props.anecdotes.length - 1
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    this.setState({selected: random})
  }

  giveVote = () => {
    const newPoints = {...this.state.points}
    newPoints[this.state.selected] += 1
    this.setState({
      points: newPoints
    })
  }

  indexForMostVotes = (points) => {
    let i_max = 0
    for (let i = 0; i < this.props.anecdotes.length; i++) {
      if (points[i] > points[i_max]) {
        i_max = i
      }
    }
    return i_max
  }

  anecdoteWithMostVotes = (points) => {
    return this.props.anecdotes[this.indexForMostVotes(points)]
  }

  render() {
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <Button handleClick={this.giveVote} text="vote" />
        <Button handleClick={this.selectRandomAnecdote} text="next anecdote" />
        <h2>anecdote with most votes</h2>
        <p>{this.anecdoteWithMostVotes(this.state.points)}</p>
      </div>
    )
  }
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
