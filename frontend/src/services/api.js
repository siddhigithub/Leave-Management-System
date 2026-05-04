import axios from 'axios';

const API_BASE = '/api';

export const api = {
  login: (data) => axios.post(`${API_BASE}/auth/login`, data),
  register: (data) => axios.post(`${API_BASE}/auth/register`, data),
  applyLeave: (data) => axios.post(`${API_BASE}/leaves/apply`, data),
  getDashboard: () => axios.get(`${API_BASE}/dashboard`),
  getPending: () => axios.get(`${API_BASE}/manager/pending`),
  action: (id, data) => axios.put(`${API_BASE}/manager/action/${id}`, data),
  getCalendar: (week) => axios.get(`${API_BASE}/calendar?week=${week}`),
  getLeaveTypes: () => axios.get(`${API_BASE}/leave-types`),
  getManagers: () => axios.get(`${API_BASE}/managers`),
};