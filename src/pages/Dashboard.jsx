import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { apiFetch } from '../api';
import '../styles.css';

function Dashboard() {
  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) window.location.href = '/';
    apiFetch(`/tasks/${user.user_id}`).then((data) => {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      setTodayTasks(data.tasks.filter((t) => t.date === today));
      setTomorrowTasks(data.tasks.filter((t) => t.date === tomorrow));
      setTaskCount(data.tasks.length);
    });
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <h2>Dashboard</h2>
      <p>Total Tasks: {taskCount}</p>
      <h3>Today's Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {todayTasks.map((t) => (
            <tr key={t.id}>
              <td>{t.task}</td>
              <td>{t.time}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Tomorrow's Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tomorrowTasks.map((t) => (
            <tr key={t.id}>
              <td>{t.task}</td>
              <td>{t.time}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;