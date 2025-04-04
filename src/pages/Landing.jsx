import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiFetch } from '../api';
import '../styles.css';

function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [omiUserId, setOmiUserId] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '//signup' : '//login';
    const body = isSignup
      ? { email, password, omi_user_id: omiUserId }
      : { email, password };

    apiFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((data) => {
        if (data.user_id) {
          localStorage.setItem('user', JSON.stringify({ user_id: data.user_id }));
          navigate('/dashboard');
        } else {
          alert('Error: ' + (data.detail || 'Unknown error occurred'));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="landing">
      <h1>Omi AI Mentor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isSignup && (
          <input
            type="text"
            placeholder="Omi User ID"
            value={omiUserId}
            onChange={(e) => setOmiUserId(e.target.value)}
            required
          />
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <button type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default Landing;