// user.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import UserComponent from '.'

const mocks = [
  {
    request: {
      query: gql`
        query GetUsers {
          users {
            id
            name
            email
          }
        }
      `,
    },
    result: {
      data: {
        users: [
          { id: '1', name: 'John', email: 'john@example.com' },
          { id: '2', name: 'Jane', email: 'jane@example.com' },
        ],
      },
    },
  },
]

test('renders users correctly', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserComponent />
    </MockedProvider>,
  )

  // Đợi cho dữ liệu được tải
  await new Promise((resolve) => setTimeout(resolve, 0))

  // Kiểm tra xem các người dùng đã được hiển thị đúng cách
  expect(screen.getByText('John')).toBeInTheDocument()
  expect(screen.getByText('Jane')).toBeInTheDocument()
})
