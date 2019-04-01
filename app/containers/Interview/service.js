import api, { getHeaders } from 'api';

export const getInterviewService = interviewId =>
  api.get(`/interview/${interviewId}`, getHeaders());
export const updateInterviewService = ({ id, ...rest }) =>
  api.put(`/interview/${id}`, rest, getHeaders());
export const scheduleInterviewService = body =>
  api.post(`/interview/scheduleInterview`, body, getHeaders());
