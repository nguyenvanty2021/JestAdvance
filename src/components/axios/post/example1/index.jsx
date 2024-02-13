import React from 'react'
import { getData } from './api'
function SimpleAPIForm() {
  const [state, setState] = React.useState({
    message: '',
    post: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    await getData(state.post)
    // const response = await getData(state.post)
    // if (response.ok) {
    //   setState({
    //     message: 'posted successfully',
    //     post: '',
    //   })
    // }
  }
  const updateEmail = (e) => {
    e.preventDefault()
    setState({ ...state, post: e.target.value })
  }
  return (
    <div className="App">
      {state.message ? <h1>{state.message}</h1> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Body:
          <input type="text" value={state.post} onChange={updateEmail} />
        </label>
        <br />
        <input placeholder="input post" type="submit" value="Post" />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}
export default SimpleAPIForm
