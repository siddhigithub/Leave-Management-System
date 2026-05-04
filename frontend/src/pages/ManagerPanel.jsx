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
    <div>
      <h2>Manager Panel</h2>
      <ul>
        {requests.map((r) => (
          <li key={r.id}>
            {r.employee_name} - {r.leave_type} - {r.start_date} to {r.end_date}
            <button onClick={() => handleAction(r.id, 'APPROVE')}>Approve</button>
            <button onClick={() => handleAction(r.id, 'REJECT')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerPanel;