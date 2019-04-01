import api from 'api';

export const callLogin = body => api.post('/auth', body);
