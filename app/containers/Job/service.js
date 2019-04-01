import api, { getHeaders } from 'api';

export const getJobService = jobId => api.get(`/job/${jobId}`, getHeaders());
export const createInterviewService = interview =>
  api.post('/interview', interview, getHeaders());

export const searchCandidateService = searchValue =>
  api.get(`/candidate/?search=${searchValue}`, getHeaders());

export const createCandidateService = candidate =>
  api.post('/candidate', candidate, getHeaders());
