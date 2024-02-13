import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import axiosMock from 'axios'
import TestAxios from './test-axios'

jest.mock('axios')
afterEach(cleanup)
it('Async axios request works', async () => {
  axiosMock.get.mockResolvedValue({ data: { title: 'some title' } })
  const url = 'https://jsonplaceholder.typicode.com/posts/1'
  render(<TestAxios url={url} />)
  const loading = screen.getByTestId('loading')
  expect(loading).toBeInTheDocument()
  expect(loading).toHaveTextContent('...Loading')
  // const resolvedEl = await waitForElement(() => getByTestId('title'))
  const resolvedEl = await screen.findByTestId('title')
  expect(resolvedEl).toHaveTextContent('some title')
  // expect(resolvedEl.textContent).toBe('some title')
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
})
