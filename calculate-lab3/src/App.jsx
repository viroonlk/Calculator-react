import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calculator from './componens/Calculator'
import CalculatorAuto from './componens/CalculatorAuto'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>test counter</h1>

      <CalculatorAuto/></>

  )
}

export default App
