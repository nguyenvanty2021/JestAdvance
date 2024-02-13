import React from 'react'

export const Application = ({ todos, setTodos }) => {
  const [count, setCount] = React.useState(0)
  const [name, setName] = React.useState('')
  return (
    <>
      <h1>Job application form</h1>
      <h2>Section 1</h2>
      <p>All fields are mandatory</p>
      <span title="close">X</span>
      <img src="https://via.placeholder.com/150" alt="a person with a laptop" />
      <div data-testid="custom-element">Custom HTML element</div>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Fullname"
            value="Vishwas"
            onChange={() => {}}
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="input name"
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" />
        </div>
        <div>
          <label htmlFor="job-location">Job location</label>
          <select id="job-location">
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={() => console.log('')}
              id="terms"
              checked={true}
            />{' '}
            I agree to the terms and conditions
          </label>
        </div>
        <button disabled>Submit</button>
      </form>
      <button onClick={() => setCount(1)}>Increase Count</button>
      <h3>{count}</h3>
    </>
  )
}
