import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.login({ email, password });
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Login failed';
      alert(message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;