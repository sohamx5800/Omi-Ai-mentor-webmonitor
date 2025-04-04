import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { apiFetch } from '../api';
import '../styles.css';

function Chat() {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) window.location.href = '/';
    apiFetch(`/chat/${user.user_id}`).then((data) => setChats(data.chats));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;

    apiFetch('/livetranscript', {
      method: 'POST',
      body: JSON.stringify({ segments: [{ text: message }], user_id: user.user_id }),
    }).then((data) => {
      setChats([...chats, { user: message, mentor: data.response, timestamp: new Date().toISOString() }]);
      setMessage('');
    });
  };

  return (
    <div className="chat">
      <Navbar />
      <h2>Chats</h2>
      <div className="chat-history">
        {chats.map((c, i) => (
          <div key={i} className="chat-message">
            <p><strong>You:</strong> {c.user}</p>
            <p><strong>AI:</strong> {c.mentor}</p>
            <small>{c.timestamp}</small>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;