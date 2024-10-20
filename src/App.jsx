import { useState, useEffect } from 'react'
import Die from './components/Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    if(dice.every(die => die.isHeld) && 
      dice.every(die => die.value === dice[0].value)) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  const rollDice = () => {
    if(tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    } else {
      setDice(prevDice => {
        return prevDice.map(die => {
          return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
        })
      })
    }
  }

  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? 
          {...die, isHeld: !die.isHeld} : 
          die
      })
    })
  }

  const diceElements = dice.map((die) => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}
      id={die.id}
    />
  ))
  
  return (
    <main>
      <div>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  )
}