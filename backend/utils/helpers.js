const Holiday = require('../models/Holiday');

async function calculateWorkingDays(start, end) {
  let days = 0;
  const current = new Date(start);
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) { // not Sunday and Saturday
      const isHoliday = await Holiday.isHoliday(current);
      if (!isHoliday) days++;
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
}

module.exports = { calculateWorkingDays };