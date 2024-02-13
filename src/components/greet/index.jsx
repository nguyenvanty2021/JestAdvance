import React from 'react'

export const handleSum = (a, b) => a + b
const Greet = ({ name }) => {
  return (
    <div>
      <p>Hello</p>
      <p>{`Hello ${name}`}</p>
      <p>Hello World</p>
    </div>
  )
}
export default Greet
