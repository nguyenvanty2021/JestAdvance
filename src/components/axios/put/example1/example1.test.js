// UpdateAccountForm.test.js
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import UpdateAccountForm from '.'
jest.mock('axios')
describe('UpdateAccountForm component', () => {
  let mock

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('sends PUT request to API with correct ID and data and shows success message', async () => {
    const accountId = 123
    mock.onPut(`https://api.example.com/accounts/${accountId}`).reply(200, {
      success: true,
    })

    render(<UpdateAccountForm accountId={accountId} />)

    const newDataInput = screen.getByPlaceholderText('New data')
    fireEvent.change(newDataInput, { target: { value: 'new data value' } })

    fireEvent.click(screen.getByText('Update Account'))

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `https://api.example.com/accounts/${accountId}`,
        { newData: 'new data value' },
      )
    })
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toHaveTextContent(
        'Account updated successfully!',
      )
    })
  })

  test('shows error message when PUT request fails', async () => {
    const accountId = 123
    mock.onPut(`https://api.example.com/accounts/${accountId}`).reply(500)

    render(<UpdateAccountForm accountId={accountId} />)

    const newDataInput = screen.getByPlaceholderText('New data')
    fireEvent.change(newDataInput, { target: { value: 'new data value' } })

    fireEvent.click(screen.getByText('Update Account'))

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Failed to update user profile',
      )
    })
  })
  test('shows error message when API response is unsuccessful', async () => {
    const accountId = 123
    mock
      .onPut(`https://api.example.com/accounts/${accountId}`)
      .reply(200, { success: false })

    render(<UpdateAccountForm accountId={accountId} />)

    const newDataInput = screen.getByPlaceholderText('New data')
    fireEvent.change(newDataInput, { target: { value: 'new data value' } })

    fireEvent.click(screen.getByText('Update Account'))

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Failed to update user profile',
      )
    })
  })
})
