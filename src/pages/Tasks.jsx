import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { apiFetch } from '../api';
import '../styles.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchTasks = async () => {
    if (!user) {
      window.location.href = '/';
      return;
    }
    try {
      const data = await apiFetch(`/tasks/${user.user_id}`);
      console.log('Tasks fetched:', data.tasks); // Debug log
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const addTask = async () => {
    const task = prompt('Task:');
    const time = prompt('Time, optional:');
    const date = prompt('Date, YYYY-MM-DD, optional:');
    try {
      await apiFetch(`/tasks/${user.user_id}`, {
        method: 'POST',
        body: JSON.stringify({ task, time, date }),
      });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="tasks">
      <Navbar />
      <h2>Tasks</h2>
      <button onClick={addTask}>Add Task</button>
      <table>
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.task}</td>
                <td>{t.time}</td>
                <td>{t.date}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No tasks available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;