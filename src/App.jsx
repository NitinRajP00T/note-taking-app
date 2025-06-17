import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import PersonalNotesApp from "./node.jsx"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <PersonalNotesApp/>
    </>
  )
}

export default App
