import { fireEvent, render, screen } from '@testing-library/react'
import { getData } from './api'
import SimpleAPIForm from '.'

jest.mock('./api')
describe('test api', () => {
  test('api', () => {
    getData.mockResolvedValueOnce({ ok: true })
    render(<SimpleAPIForm />)
    const labelBody = screen.getByLabelText(/Body:/i)
    expect(labelBody).toBeInTheDocument()
    const valueOnchangeInput = 'sample title'
    fireEvent.change(labelBody, {
      target: {
        value: valueOnchangeInput,
      },
    })
    expect(labelBody.value).toBe(valueOnchangeInput)
    const isInputHasValue = screen.getByPlaceholderText('input post')
    expect(isInputHasValue).toBeInTheDocument()
    const buttonSubmit = screen.getByRole('button', {
      name: 'Submit',
    })
    expect(buttonSubmit).toBeInTheDocument()
    fireEvent.click(buttonSubmit)
    expect(getData).toHaveBeenCalledTimes(1)
    expect(getData).toHaveBeenCalledWith(valueOnchangeInput)
  })
})
