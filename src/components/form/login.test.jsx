import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import * as Api from './api/api'
// import userEvent from '@testing-library/user-event'
import LoginForm from '.'
import { registerUser } from './api/api'

jest.mock('./api/api')
Api.registerUser = jest.fn()

test('submits form when button is clicked', () => {
  // const obSubmit = jest.fn()
  render(<LoginForm />)

  const email = screen.getByLabelText('username')
  const password = screen.getByLabelText('password')
  const button = screen.getByRole('button')
  const checkbox = screen.getByTestId('checkboxInput')
  const select = screen.getByTestId('selectId')
  const radio = screen.getByTestId('radioId')
  fireEvent.change(email, { target: { value: 'user@test.com' } })
  fireEvent.change(password, { target: { value: 'Test1234' } })
  fireEvent.click(checkbox)
  fireEvent.click(radio)
  fireEvent.change(select, {
    target: {
      value: 'option2',
    },
  })
  fireEvent.click(button)

  // userEvent.type(email, 'user@test.com')
  // userEvent.type(password, 'Test1234')
  // userEvent.click(button)

  expect(registerUser).toHaveBeenCalledTimes(1)
  expect(registerUser).toHaveBeenCalledWith({
    email: 'user@test.com',
    password: 'Test1234',
    checkboxValue: true,
    selectValue: 'option2',
    radioValue: 'option1',
  })
})
