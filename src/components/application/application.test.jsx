import { fireEvent, render, screen } from '@testing-library/react'
import { Application } from '.'

// beforeAll chỉ chạy một lần trước khi bắt đầu chạy tất cả các test cases
// beforeEach có bao nhiêu test case thì beforeEach sẽ chạy bấy nhiêu lần (vẫn chạy trước mỗi test case nha)

const mockFuncSetTodos = jest.fn()
describe('Application', () => {
  test('has checkbox, input, button, select, header tag', () => {
    // props của component này có truyền vào 1 state và 1 setState, nên mình cũng phải truyền vào, nếu không có data thì truyền default và 1 func rỗng
    render(<Application todos={[]} setTodos={mockFuncSetTodos} />)
    // const hasInput = screen.getByRole("textbox", {
    //   name: "name",
    // }); // textbox is input
    // expect(hasInput).toBeInTheDocument();
    const hasHeaderTagByName = screen.getByRole('heading', {
      // heading is header tag
      name: 'Job application form', // theo name
    })
    expect(hasHeaderTagByName).toBeInTheDocument()
    const hasHeaderTagByLevel = screen.getByRole('heading', {
      // heading is header tag
      level: 2, // theo level
    })
    expect(hasHeaderTagByLevel).toBeInTheDocument()
    const hasSelect = screen.getByRole('combobox') // combobox is select
    expect(hasSelect).toBeInTheDocument()
    const hasCheckbox = screen.getByRole('checkbox')
    expect(hasCheckbox).toBeInTheDocument()
    // checkbox has value is true
    expect(hasCheckbox).toBeChecked()
    const hasButton = screen.getByRole('button', {
      name: 'Submit',
    })
    expect(hasButton).toBeInTheDocument()
    const hasTextName = screen.getByLabelText('Name') // same with screen.getByText
    // VD: input, textarea, select thì dùng: getByLabelText, mấy thẻ html, button thì dùng: getByText
    expect(hasTextName).toBeInTheDocument()
    const hasPlaceholderText = screen.getByPlaceholderText('Fullname')
    expect(hasPlaceholderText).toBeInTheDocument()
    const defaultValueInput = screen.getByDisplayValue('Vishwas')
    expect(defaultValueInput).toBeInTheDocument()
    const altImageDefault = screen.getByAltText('a person with a laptop')
    expect(altImageDefault).toBeInTheDocument()
    const hasButtonSubmit = screen.getByRole('button', {
      name: 'Submit',
    })
    expect(hasButtonSubmit).toBeDisabled() // is button disabled
    const hasInput = screen.getByPlaceholderText('Fullname')
    expect(hasInput).toHaveAttribute('type', 'text') // <input type='text' value='Vishwas' />
    expect(hasInput).toHaveValue('Vishwas')
    const hasInputName = screen.getByPlaceholderText('input name')
    // bắt onChange value input cách 2, cách 1 nằm ở folder components/counter
    // onChange input value 'abc'
    fireEvent.change(hasInputName, {
      target: {
        value: 'abc',
      },
    })
    // input has value is 'abc'
    expect(hasInputName.value).toBe('abc')
    const hasButtonIncreaseCount = screen.getByRole('button', {
      name: 'Increase Count',
    })
    fireEvent.click(hasButtonIncreaseCount)
    const hasHeaderLevel3 = screen.getByRole('heading', {
      level: 3,
    })
    expect(hasHeaderLevel3).toHaveTextContent('1')
    // or
    // expect(hasHeaderLevel3.textContent).toBe('1')
  })
})
