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
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
          }
        }
      `,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        user: { id: '1', name: 'John', email: 'john@example.com' },
      },
    },
  },
]
// beforeEach(() => {
//   fetch.resetMocks()
// })
test('renders user correctly', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserComponent userId="1" />
    </MockedProvider>,
  )
  // Kiểm tra rằng dữ liệu đang được tải
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  // Đợi cho dữ liệu được tải
  await new Promise((resolve) => setTimeout(resolve, 0))

  // Kiểm tra xem user đã được hiển thị đúng cách
  expect(screen.getByText('John')).toBeInTheDocument()
  expect(screen.getByText('john@example.com')).toBeInTheDocument()
})
