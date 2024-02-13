// UserList.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        )
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>User List</h1>
      <div>
        {users.map((user) => (
          <li key={user.id}>
            <div>{user.name}</div>
          </li>
        ))}
      </div>
    </div>
  )
}

export default UserList
