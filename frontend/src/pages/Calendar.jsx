import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Calendar = () => {
  const [leaves, setLeaves] = useState([]);
  const [week, setWeek] = useState('current');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getCalendar(week);
        setLeaves(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [week]);

  return (
    <main className="page-shell panel-page">
      <div className="page-header">
        <div>
          <h2>Team Calendar</h2>
          <p>See upcoming approved leave for the current and next week.</p>
        </div>
        <div className="toolbar">
          <button className="button-secondary" onClick={() => setWeek('current')}>Current Week</button>
          <button className="button-secondary" onClick={() => setWeek('next')}>Next Week</button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Dates</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l, i) => (
                <tr key={i}>
                  <td>{l.employee_name}</td>
                  <td>{l.leave_type}</td>
                  <td>{l.start_date} to {l.end_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Calendar;