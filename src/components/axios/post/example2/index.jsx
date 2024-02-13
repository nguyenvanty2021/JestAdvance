// UserForm.js
import React, { useState } from 'react'
import axios from 'axios'

const UserForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://api.example.com/users', { name, email })
      setSuccessMessage('Comment submitted successfully!')
      setErrorMessage('nothing')
      // window.alert('User created successfully!')
    } catch (error) {
      setErrorMessage('Error submitting comment')
      setSuccessMessage('')
      // window.alert('Error creating user')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {successMessage && (
        <div data-testid="success-message">{successMessage}</div>
      )}
      {errorMessage && <div data-testid="error-message">{errorMessage}</div>}
      <button type="submit">Submit</button>
    </form>
  )
}

export default UserForm
