import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TestAxios = (props) => {
  const [state, setState] = useState()

  useEffect(() => {
    axios.get(props.url).then((res) => setState(res.data))
  }, [props.url])

  return (
    <div>
      <h1> Axios Test </h1>
      {state ? (
        <p data-testid="title">{state.title}</p>
      ) : (
        <p data-testid="loading">...Loading</p>
      )}
    </div>
  )
}

export default TestAxios
