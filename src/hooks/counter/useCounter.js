import { useState } from 'react'

export const useCounter = ({ initialCount = 0, counter = 0 } = {}) => {
  const [count, setCount] = useState(initialCount + counter)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  return { count, increment, decrement }
}
