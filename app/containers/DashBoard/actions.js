import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import { getJobsService, createJobsService } from './service';
export const DASHBOARD_ACTIONS = {
  GET_JOBS: 'GET_JOBS',
  GET_JOBS_SUCCESS: 'GET_JOBS_SUCCESS',
  GET_JOBS_FAILURE: 'GET_JOBS_FAILURE',
  CREATE_JOB: 'CREATE_JOB',
  CREATE_JOB_SUCCESS: 'CREATE_JOB_SUCCESS',
  CREATE_JOB_FAILURE: 'CREATE_JOB_FAILURE',
};

export const getJobs = () => async dispatch => {
  dispatch({ type: DASHBOARD_ACTIONS.GET_JOBS });
  try {
    const respose = await getJobsService();
    dispatch({
      type: DASHBOARD_ACTIONS.GET_JOBS_SUCCESS,
      jobs: _get(respose, 'data'),
    });
  } catch (err) {
    dispatch({ type: DASHBOARD_ACTIONS.GET_JOBS_FAILURE, err });
  }
};

export const createJob = (job, closeModal) => async dispatch => {
  dispatch({ type: DASHBOARD_ACTIONS.CREATE_JOB });
  try {
    const respose = await createJobsService(job);
    dispatch({
      type: DASHBOARD_ACTIONS.CREATE_JOB_SUCCESS,
      job: _get(respose, 'data'),
    });
    closeModal();
  } catch (err) {
    dispatch({ type: DASHBOARD_ACTIONS.CREATE_JOB_FAILURE, err });
  }
};
