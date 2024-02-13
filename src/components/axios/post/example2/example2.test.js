// UserForm.test.js
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import UserForm from '.'
jest.mock('axios')
describe('UserForm component', () => {
  let mock

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('submits user data to API and shows success alert', async () => {
    mock.onPost('https://api.example.com/users').reply(200)

    render(<UserForm />)

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://api.example.com/users', {
        name: 'John Doe',
        email: 'john@example.com',
      })
    })
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument()
    })
  })

  test('shows error alert when API call fails', async () => {
    mock.onPost('https://api.example.com/users').reply(500)

    render(<UserForm />)

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
  })
})
