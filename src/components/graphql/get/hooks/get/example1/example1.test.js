// useUser.test.js
import { renderHook } from '@testing-library/react-hooks'
import fetch from 'jest-fetch-mock'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { useUser } from '.'

const mockUser = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
}

const mocks = [
  {
    request: {
      query: gql`
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
          }
        }
      `,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        user: mockUser,
      },
    },
  },
]
describe('api get graphql', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  test('fetches user data', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockUser))

    const { result, waitForNextUpdate } = renderHook(() => useUser('1'), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    })
    // expect(await waitFor(() => getByText('Hello'))).toBeInTheDocument()
    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBeTruthy()
    await waitForNextUpdate()
    // Kiểm tra dữ liệu đã được load và xử lý đúng
    expect(result.current.loading).toBeFalsy()
    expect(result.current.user).toEqual(mockUser)
  })
})
