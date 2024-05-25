import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [inputVal, setInputVal] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const socket = useMemo(() => io('http://localhost:3000'), []);

  useEffect(() => {
    socket.on('connect', () => {});
    socket.on('welcome', (payload) => console.log(payload));
    socket.on('message', (payload) => console.log(payload));
    socket.on('typing', (message) => setTypingMessage(message));
    socket.on('stopTyping', () => setTypingMessage(''));
  }, [socket]);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    if (e.target.value) {
      socket.emit('typing', 'User'); // Replace 'User' with actual username if available
    } else {
      socket.emit('stopTyping');
    }
  };

  const submitHandler = () => {
    socket.emit('username', inputVal);
    setInputVal('');
    socket.emit('stopTyping');
  };

  return (
    <>
      <input
        type="text"
        value={inputVal}
        onChange={handleInputChange}
      />
      <button onClick={submitHandler}>Send</button>
      <div>{typingMessage}</div>
    </>
  );
}

export default App;
