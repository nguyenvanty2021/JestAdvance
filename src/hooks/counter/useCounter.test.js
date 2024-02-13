import { act, renderHook } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  test('default count value', () => {
    const { result } = renderHook(useCounter)
    expect(result.current.count).toBe(0)
  })
  test('pass props value', () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 10,
        counter: 20,
      },
    })
    expect(result.current.count).toBe(30)
  })
  test('handle action increase count', () => {
    const { result } = renderHook(useCounter)
    // result.current.increment() // bắt buộc phải bọc trong act mới get được func increment
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)
  })
})
