import React from 'react'

const Counter = () => {
  const [counter, setCounter] = React.useState(0)
  const [amount, setAmount] = React.useState(0)
  return (
    <div>
      <h1>{counter}</h1>
      <button
        onClick={() => setCounter((prevCounter) => (prevCounter === 1 ? 0 : 1))}
      >
        Increase counter
      </button>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button onClick={() => setCounter(amount)}>Set</button>
      <p data-testid="contentId">content ne</p>
    </div>
  )
}
export default Counter
