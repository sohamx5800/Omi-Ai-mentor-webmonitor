import { Link } from 'react-router-dom';
import '../styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/memories">Memories</Link>
      <Link to="/chat">Chat</Link>
    </nav>
  );
}

export default Navbar;