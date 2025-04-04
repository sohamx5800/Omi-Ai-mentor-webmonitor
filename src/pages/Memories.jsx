import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { apiFetch } from '../api';
import '../styles.css';

function Memories() {
  const [memories, setMemories] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchMemories = async () => {
    if (!user) {
      window.location.href = '/';
      return;
    }
    try {
      const data = await apiFetch(`/memories/${user.user_id}`);
      console.log('Memories fetched:', data.memories); // Debug log
      setMemories(data.memories || []);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  useEffect(() => {
    fetchMemories();
    const interval = setInterval(fetchMemories, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const deleteMemory = async (memoryId) => {
    if (window.confirm('क्या आप इस स्मृति को हटाना चाहते हैं? (Do you want to delete this memory?)')) {
      try {
        await apiFetch(`/memories/${user.user_id}/${memoryId}`, {
          method: 'DELETE',
        });
        fetchMemories();
      } catch (error) {
        console.error('Error deleting memory:', error);
      }
    }
  };

  return (
    <div className="memories">
      <Navbar />
      <h2>Memories</h2>
      <div className="memory-list">
        {memories.length > 0 ? (
          memories.map((m) => (
            <div key={m.id} className="memory-card">
              <h3>{m.title || 'Untitled'}</h3>
              <p><strong>Transcription:</strong> {m.transcript}</p>
              <p><strong>Response:</strong> {m.response}</p>
              <button onClick={() => deleteMemory(m.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No memories available</p>
        )}
      </div>
    </div>
  );
}

export default Memories;