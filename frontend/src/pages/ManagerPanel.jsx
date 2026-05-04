import { useState, useEffect } from 'react';
import { api } from '../services/api';

const ManagerPanel = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getPending();
        setRequests(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAction = async (id, action) => {
    const comment = prompt('Comment:');
    try {
      await api.action(id, { action, comment });
      setRequests(requests.filter(r => r.id !== id));
    } catch (error) {
      alert('Failed');
    }
  };

  return (
    <main className="page-shell panel-page">
      <div className="page-header">
        <div>
          <h2>Manager Panel</h2>
          <p>Review pending leave requests and provide feedback.</p>
        </div>
      </div>

      <ul className="request-list">
        {requests.map((r) => (
          <li key={r.id} className="request-row">
            <div className="request-item">
              <div>
                <strong>{r.employee_name}</strong>
                <p>{r.leave_type} • {r.start_date} to {r.end_date}</p>
              </div>
              <div className="request-actions">
                <button className="button" onClick={() => handleAction(r.id, 'APPROVE')}>Approve</button>
                <button className="button-secondary" onClick={() => handleAction(r.id, 'REJECT')}>Reject</button>
              </div>
            </div>
            <p>{r.reason}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ManagerPanel;