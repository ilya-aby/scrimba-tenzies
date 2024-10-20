import { useState } from 'react'
import Die from './components/Die.jsx'

export default function App() {

  const allNewDice = () => {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({value: Math.ceil(Math.random() * 6), isHeld: false})
    }
    return newDice
  }

  const [dice, setDice] = useState(allNewDice())

  const rollDice = () => {
    setDice(allNewDice())
  }
  
  return (
    <main>
      <div>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dice-container">
        {dice.map((die) => (
          <Die key={die.id} value={die.value} isHeld={die.isHeld} />
        ))}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}