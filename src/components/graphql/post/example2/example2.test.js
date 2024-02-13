// createUser.test.js
import fetchMock from 'fetch-mock'
const CREATE_USER_MUTATION = `
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`

const mockUser = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
}

// Thiết lập mock response cho request POST đến URL '/graphql'
fetchMock.post('http://example.com/graphql', {
  status: 200,
  body: { data: { createUser: mockUser } },
})

test('creates a new user', async () => {
  // Thực hiện hành động gọi API để tạo mới user
  const response = await fetch('http://example.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CREATE_USER_MUTATION, // Truyền vào mutation để tạo mới user
      variables: { name: 'John', email: 'john@example.com' },
    }),
  })

  // Parse kết quả trả về từ API
  const data = await response.json()

  // Kiểm tra kết quả trả về từ API
  expect(data).toEqual({ data: { createUser: mockUser } })
})
