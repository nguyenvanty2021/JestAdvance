import './App.css'
import SimpleAPIForm from './components/api'
import { Application } from './components/application'
import Counter from './components/counter'
import Greet from './components/greet'
import LoginForm from './components/form'

function App() {
  return (
    <>
      <Greet />
      <Application />
      <Counter />
      <SimpleAPIForm />
      <LoginForm />
    </>
  )
}

export default App
