import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // reset choices & increase turn
  const newTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(oldTurns => oldTurns + 1)
    setDisabled(false)
  }

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random(), flipped: false }))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    card.flipped = true
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  // compare 2 selected cards
  useEffect(() => {
    let timeout = 1000
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        timeout = 1
      }
      setTimeout(()=>newTurn(), timeout)
    }
  }, [choiceOne, choiceTwo])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <p>Turns {turns}</p>
      <button onClick={shuffleCards}>New Game</button>

      <ul className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </ul>

    </div>
  );
}

export default App