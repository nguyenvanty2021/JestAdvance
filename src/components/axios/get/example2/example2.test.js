// UserList.test.js
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import UserList from '.'

const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
]

test('fetches and displays users from API', async () => {
  const mock = new MockAdapter(axios)
  mock.onGet('https://jsonplaceholder.typicode.com/users').reply(200, mockUsers)

  render(<UserList />)
  const userListItems = await screen.findAllByRole('listitem')
  expect(userListItems).toHaveLength(mockUsers?.length)

  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    expect(userListItems[0]).toHaveTextContent('John Doe')
  })
  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    expect(userListItems[1]).toHaveTextContent('Jane Smith')
  })
  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    expect(userListItems[2]).toHaveTextContent('Alice Johnson')
  })
})
