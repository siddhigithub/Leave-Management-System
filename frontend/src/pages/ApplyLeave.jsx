import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [managers, setManagers] = useState([]);
  const [form, setForm] = useState({ leave_type_id: '', start_date: '', end_date: '', reason: '', manager_id: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesRes = await api.getLeaveTypes();
        setLeaveTypes(typesRes.data);
        const managersRes = await api.getManagers();
        setManagers(managersRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.applyLeave(form);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to apply';
      alert(message);
      console.error('Apply leave error:', error);
    }
  };

  return (
    <main className="page-shell form-page">
      <div className="page-header">
        <div>
          <h2>Apply Leave</h2>
          <p>Submit your leave request and notify your manager.</p>
        </div>
      </div>

      <div className="form-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <select value={form.leave_type_id} onChange={(e) => setForm({ ...form, leave_type_id: e.target.value })} required>
            <option value="">Select Leave Type</option>
            {leaveTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} required />
          <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} required />
          <input type="text" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Reason" required />
          <select value={form.manager_id} onChange={(e) => setForm({ ...form, manager_id: e.target.value })} required>
            <option value="">Select Manager</option>
            {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <button className="button" type="submit">Apply</button>
        </form>
      </div>
    </main>
  );
};

export default ApplyLeave;