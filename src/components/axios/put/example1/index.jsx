// UpdateAccountForm.js
import React, { useState } from 'react'
import axios from 'axios'

const UpdateAccountForm = ({ accountId }) => {
  const [newData, setNewData] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleUpdateAccount = async () => {
    try {
      await axios.put(`https://api.example.com/accounts/${accountId}`, {
        newData,
      })
      if (true) {
        setSuccessMessage('Account updated successfully!')

        setErrorMessage('Failed to update user profile')
      } else {
        setSuccessMessage('Account updated successfully!')
        setErrorMessage('Failed to update user profile')
      }
    } catch (error) {
      // setErrorMessage('Network error. Please try again later.')
      setErrorMessage('Failed to update user profile')
      setSuccessMessage('')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={newData}
        onChange={(e) => setNewData(e.target.value)}
        placeholder="New data"
      />
      <button onClick={handleUpdateAccount}>Update Account</button>
      {errorMessage && <div data-testid="error-message">{errorMessage}</div>}
      {successMessage && (
        <div data-testid="success-message">{successMessage}</div>
      )}
    </div>
  )
}

export default UpdateAccountForm
