import { useState } from 'react'
import Die from './components/Die.jsx'
import { nanoid } from 'nanoid'

export default function App() {

  const [dice, setDice] = useState(allNewDice())

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
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
      })
    })
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
      <button className="roll-dice-btn" onClick={rollDice}>Roll</button>
    </main>
  )
}