import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
function App() {
  const [inputVal, setInputVal] = useState()
  const socket = useMemo(() => io('http://localhost:3000'), [])
  useEffect(() => {
    socket.on('connect', () => {})
    socket.on('welcome', (payload) => console.log(payload))
    socket.on('message', (payload) => console.log(payload))
  }, [])

  const submitHandler = () => {
    socket.emit('username', inputVal)
  }
  return (
    <>
      <input type="text" onChange={(e) => setInputVal(e.target.value)} />
      <button onClick={submitHandler}>send</button>
    </>
  )
}

export default App
