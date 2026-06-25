import { useState } from 'react'
import FaceDetector from './Features/Expression/components/FaceExpression'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <FaceDetector/>
    </>
  )
}

export default App
