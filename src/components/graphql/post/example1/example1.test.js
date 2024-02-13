// createUser.test.js
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
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

// Tạo mock axios
const mockAxios = new MockAdapter(axios)

// Thiết lập mock response cho request POST đến URL '/graphql'
mockAxios.onPost('/graphql').reply(200, {
  data: { createUser: mockUser },
})

test('creates a new user', async () => {
  // Thực hiện hành động gọi API để tạo mới user
  const response = await axios.post('/graphql', {
    query: CREATE_USER_MUTATION, // Truyền vào mutation để tạo mới user
    variables: { name: 'John', email: 'john@example.com' },
  })

  // Kiểm tra kết quả trả về từ API
  expect(response.status).toBe(200)
  expect(response.data).toEqual({ data: { createUser: mockUser } })
})
