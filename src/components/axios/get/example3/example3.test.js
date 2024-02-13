// WeatherForecast.test.js
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import WeatherForecast from '.'

const mockForecast = [{ date: '2024-02-12', temperature: 20 }]
// afterEach(() => {
//   jest.clearAllMocks()
// })
let mock

beforeEach(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.restore()
})
test('fetches and displays forecast from API', async () => {
  mock
    .onGet('https://api.example.com/weather-forecast')
    .reply(200, mockForecast)

  render(<WeatherForecast />)
  const forecastItems = await screen.findAllByRole('listitem')
  expect(forecastItems).toHaveLength(mockForecast?.length)
  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    expect(forecastItems[0]).toHaveTextContent('2024-02-12: 20°C')
  })
})

test('displays loading message while fetching users', async () => {
  mock.onGet('https://api.example.com/weather-forecast').reply((config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, mockForecast])
      }, 500) // Delay for 500ms
    })
  })

  render(<WeatherForecast />)

  // Check if loading message is displayed
  const loadingMessage = screen.getByText('Loading...')
  expect(loadingMessage).toBeInTheDocument()

  // Wait for the data to be fetched and loading message to disappear
  await waitFor(() => {
    const loadingMessage = screen.queryByText('Loading...')
    expect(loadingMessage).not.toBeInTheDocument()
  })
})
test('displays error message when API call fails', async () => {
  mock.onGet('https://api.example.com/weather-forecast').reply(500)

  render(<WeatherForecast />)

  // Wait for the error message to be displayed
  await waitFor(() => {
    const errorMessage = screen.getByText('Error fetching forecast')
    expect(errorMessage).toBeInTheDocument()
  })
})
