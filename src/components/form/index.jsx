import React, { useState } from 'react'
import { registerUser } from './api/api'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [selectValue, setSelectValue] = useState('')
  const [radioValue, setRadioValue] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    // onSubmit()
    registerUser({
      email,
      password,
      checkboxValue,
      selectValue,
      radioValue,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username
        <input
          type="email"
          placeholder="user@test.com"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </label>
      <input
        data-testid="checkboxInput"
        type="checkbox"
        name="checkbox"
        checked={checkboxValue}
        onChange={(e) => setCheckboxValue(e?.target?.checked)}
      />
      <select
        data-testid="selectId"
        name="select"
        value={selectValue}
        onChange={(e) => setSelectValue(e?.target?.value)}
      >
        <option value="">Select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <input
        data-testid="radioId"
        type="radio"
        name="radio"
        value="option1"
        checked={radioValue}
        onChange={(e) => setRadioValue(e?.target?.value)}
      />
      <button disabled={!email || !password}>Click</button>
    </form>
  )
}

export default LoginForm
