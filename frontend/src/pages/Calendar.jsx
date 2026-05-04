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
    <div>
      <h2>Team Calendar</h2>
      <button onClick={() => setWeek('current')}>Current Week</button>
      <button onClick={() => setWeek('next')}>Next Week</button>
      <ul>
        {leaves.map((l, i) => <li key={i}>{l.employee_name} - {l.leave_type} - {l.start_date} to {l.end_date}</li>)}
      </ul>
    </div>
  );
};

export default Calendar;