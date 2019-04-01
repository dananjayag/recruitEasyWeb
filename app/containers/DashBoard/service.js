import api, { getHeaders } from 'api';

export const getJobsService = () => api.get('/job', getHeaders());
export const createJobsService = job => api.post('/job', job, getHeaders());
