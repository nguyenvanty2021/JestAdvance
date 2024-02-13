// UserComponent.jsx
import React from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

const UserComponent = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserComponent
