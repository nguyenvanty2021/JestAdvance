// Navbar.test.js
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history' // Thay đổi import từ 'react-router-dom' thành 'history'
import Navbar from '.'

test('renders navbar with correct links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )

  const homeLink = screen.getByText('Home')
  const aboutLink = screen.getByText('About')
  const contactLink = screen.getByText('Contact')

  expect(homeLink).toBeInTheDocument()
  expect(homeLink).toHaveAttribute('href', '/')

  expect(aboutLink).toBeInTheDocument()
  expect(aboutLink).toHaveAttribute('href', '/about')

  expect(contactLink).toBeInTheDocument()
  expect(contactLink).toHaveAttribute('href', '/contact')
})

test('navigates to correct route when link is clicked', () => {
  const history = createMemoryHistory() // Sử dụng hàm createMemoryHistory từ history
  render(
    <Router history={history}>
      <Navbar />
    </Router>,
  )

  fireEvent.click(screen.getByText('About'))
  expect(history.location.pathname).toBe('/about')

  fireEvent.click(screen.getByText('Contact'))
  expect(history.location.pathname).toBe('/contact')
})
