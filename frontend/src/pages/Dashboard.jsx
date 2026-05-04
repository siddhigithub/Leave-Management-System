import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [balances, setBalances] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getDashboard();
        setBalances(res.data.balances);
        setHistory(res.data.history);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
      <Link to="/apply-leave">Apply Leave</Link>
      {user?.role === 'MANAGER' && <Link to="/manager">Manager Panel</Link>}
      <Link to="/calendar">Calendar</Link>

      <h3>Leave Balances</h3>
      <ul>
        {balances.map((b, i) => <li key={i}>{b.name}: {b.remaining_days}</li>)}
      </ul>

      <h3>Leave History</h3>
      <ul>
        {history.map((h, i) => <li key={i}>{h.leave_type} - {h.start_date} to {h.end_date} - {h.status}</li>)}
      </ul>
    </div>
  );
};

export default Dashboard;