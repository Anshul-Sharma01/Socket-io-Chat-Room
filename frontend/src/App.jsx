import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import './App.css';
import { Socket } from 'socket.io-client';


const socket = io.connect("http://localhost:5000");
const userName = nanoid(5);


function App() {

  const [ message, setMessage ] = useState('');
  const [ chat, setChat ] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chatroom", {message, userName});
    setMessage("");
  } 

  useEffect(() => {
    socket.on("chatroom", (payload) => {
      setChat([ ...chat, payload ])
    })
  })

  return (
    <>
      <h1>Chat-Room</h1>
      {
        chat.map((payload, ind) => {
          return (
            <p key={ind}>{payload.message} <span>({payload.userName})</span></p>
          )
        })
      }
      <form onSubmit={sendChat}>
        <input type="text" name='chat' placeholder='enter message' value={message} onChange={(e) => {
          setMessage(e.target.value);
        }} />
        <button type='submit'>Send </button>
      </form>
    </>
  )
}

export default App
