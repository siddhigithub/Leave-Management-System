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
    <main className="page-shell dashboard-page">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome, {user?.name}</p>
        </div>
        <div className="toolbar">
          <button className="button" onClick={logout}>Logout</button>
          <Link className="button-secondary" to="/apply-leave">Apply Leave</Link>
          <Link className="button-secondary" to="/calendar">Calendar</Link>
          {user?.role === 'MANAGER' && <Link className="button-secondary" to="/manager">Manager Panel</Link>}
        </div>
      </div>

      {user?.role === 'ADMIN' && (
        <section className="admin-actions">
          <div className="card">
            <h3>Admin Controls</h3>
            <p>Use admin tools to manage users, leave types, and holidays.</p>
          </div>
          <div className="card">
            <h3>Reports</h3>
            <p>Check leave reports and system-wide status.</p>
          </div>
        </section>
      )}

      <section className="card-grid">
        {balances.map((balance) => (
          <div className="card" key={balance.name}>
            <h3>{balance.name}</h3>
            <p>Remaining</p>
            <p><strong>{balance.remaining_days}</strong></p>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>Leave History</h3>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Dates</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td>{h.leave_type}</td>
                  <td>{h.start_date} → {h.end_date}</td>
                  <td>{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;