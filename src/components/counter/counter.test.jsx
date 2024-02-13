import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import Counter from '.'

describe('Counter', () => {
  let component
  beforeEach(() => {
    component = <Counter />
  })
  test('get element by id', () => {
    render(component)
    // dùng getByTestId cho đồng bộ, nếu bất đồng bộ thì dùng findByTestId
    // Example: await screen.findByTestId('contentId')
    // id thì dùng findByTestId, text thì dùng findByTest
    const getElementById = screen.getByTestId('contentId')
    expect(getElementById).toBeInTheDocument()
  })
  test('renders a counter of 0', () => {
    render(component)
    const getValueHeader = screen.getByRole('heading')
    expect(getValueHeader).toHaveTextContent('0')
  })
  test('change counter', async () => {
    user.setup()
    render(component)
    const btnChangeCounter = screen.getByRole('button', {
      name: 'Increase counter',
    })
    await user.click(btnChangeCounter)
    const getValueHeader = screen.getByRole('heading')
    expect(getValueHeader).toHaveTextContent('1')
  })
  test('rendres a count of 10 after clicking the set button', async () => {
    user.setup()
    render(component)
    const amountInput = screen.getByRole('spinbutton') // spinbutton is input
    await user.type(amountInput, '10') // onChange input value 10
    expect(amountInput).toHaveValue(10) // input has value is 10
    const setButton = screen.getByRole('button', { name: 'Set' })
    await user.click(setButton)
    const countElement = screen.getByRole('heading')
    expect(countElement).toHaveTextContent('10')
  })
})
