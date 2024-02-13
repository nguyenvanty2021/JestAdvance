// UserComponent.js
import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`

const UserComponent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createUser, { loading, error, data }] =
    useMutation(CREATE_USER_MUTATION)

  const handleCreateUser = async () => {
    try {
      await createUser({ variables: { name, email } })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1>Create User</h1>
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
      <button onClick={handleCreateUser} disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
      {error && <p>Error creating user: {error.message}</p>}
      {data && <p>Done</p>}
    </div>
  )
}

export default UserComponent
