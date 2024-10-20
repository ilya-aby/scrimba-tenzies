/* eslint-disable react/prop-types */

export default function Die({value, isHeld, holdDice}) {
  return (
    <button 
      className={`die-face ${isHeld ? "held" : ""}`}
      onClick={holdDice}
    >
      {value}
    </button>
  )
}
