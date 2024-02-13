// ItemList.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import ItemList from '.'

test('renders the list of items', () => {
  const mockItems = ['Item 1', 'Item 2', 'Item 3']
  render(<ItemList items={mockItems} />)
  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(mockItems?.length)
  expect(listItems[0]).toHaveTextContent('Item 1')
  expect(listItems[1]).toHaveTextContent('Item 2')
  expect(listItems[2]).toHaveTextContent('Item 3')
})

test('renders an empty list when no items are provided', () => {
  render(<ItemList items={[]} />)
  const listItems = screen.queryAllByRole('listitem')
  expect(listItems).toHaveLength(0)
})
