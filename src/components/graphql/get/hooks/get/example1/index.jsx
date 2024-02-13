// useUser.js
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`

export const useUser = (userId) => {
  const [user, setUser] = useState(null)
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  })

  useEffect(() => {
    if (!loading && !error && data) {
      setUser(data.user)
    }
  }, [loading, error, data])

  return { user, loading, error }
}
