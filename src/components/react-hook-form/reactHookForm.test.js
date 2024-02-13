// SignUpForm.test.js
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import SignUpForm from '.'

test('displays error messages when fields are empty', async () => {
  const onSubmit = jest.fn()
  render(<SignUpForm onSubmit={onSubmit} />)
  fireEvent.click(screen.getByText('Sign Up'))
  await waitFor(() => {
    expect(screen.getByText('Username is required')).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })
  expect(onSubmit).not.toHaveBeenCalled()
})

test('displays error message when username is too short', async () => {
  const onSubmit = jest.fn()
  render(<SignUpForm onSubmit={onSubmit} />)
  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: 'user' },
  })
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: '1234567' },
  })
  fireEvent.click(screen.getByText('Sign Up'))
  await waitFor(() => {
    expect(
      screen.getByText('Username must be at least 6 characters'),
    ).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(
      screen.getByText('Password must be at least 8 characters'),
    ).toBeInTheDocument()
  })
  expect(onSubmit).not.toHaveBeenCalled()
})

test('submits form with valid data', async () => {
  const onSubmit = jest.fn()
  render(<SignUpForm onSubmit={onSubmit} />)
  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: 'testuser' },
  })
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'password123' },
  })
  fireEvent.click(screen.getByText('Sign Up'))

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    })
  })
})
