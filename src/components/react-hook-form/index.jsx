// SignUpForm.js
import React from 'react'
import { useForm } from 'react-hook-form'

const SignUpForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitForm = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input
        {...register('username', { required: true, minLength: 6 })}
        placeholder="Username"
      />
      {errors.username && errors.username.type === 'required' && (
        <span>Username is required</span>
      )}
      {errors.username && errors.username.type === 'minLength' && (
        <span data-testid="usernameLeast">
          Username must be at least 6 characters
        </span>
      )}
      <input
        type="password"
        {...register('password', { required: true, minLength: 8 })}
        placeholder="Password"
      />
      {errors.password && errors.password.type === 'required' && (
        <span>Password is required</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span>Password must be at least 8 characters</span>
      )}
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUpForm
