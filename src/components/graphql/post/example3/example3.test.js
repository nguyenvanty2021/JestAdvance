// createUser.test.js
import { render, waitFor, screen } from '@testing-library/react'
import { ApolloProvider } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { createMockClient } from 'mock-apollo-client'
import UserComponent from '.'

const mockUser = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`

// Tạo mock Apollo Client
const mockClient = createMockClient()

// Thiết lập mock response cho mutation CREATE_USER_MUTATION
mockClient.setRequestHandler(CREATE_USER_MUTATION, (req) => {
  const { name, email } = req.variables
  if (name === 'John' && email === 'john@example.com') {
    return Promise.resolve({ data: { createUser: mockUser } })
  }
  return Promise.reject(new Error('Invalid input'))
})

test('creates a new user', async () => {
  render(
    <ApolloProvider client={mockClient}>
      <UserComponent />
    </ApolloProvider>,
  )

  // Chờ cho việc mutate được hoàn thành
  // const done = await screen.findByTestId('done')
  // expect(done).toBeInTheDocument()
  // await waitFor(() => {
  //   const doneElement = screen.getByText('Done')
  //   expect(doneElement).toBeInTheDocument()
  // })
})
