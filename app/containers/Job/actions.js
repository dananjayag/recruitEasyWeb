import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import {
  getJobService,
  createInterviewService,
  searchCandidateService,
  createCandidateService,
} from './service';
export const JOB_ACTIONS = {
  GET_JOB: 'GET_JOB',
  GET_JOB_SUCCESS: 'GET_JOB_SUCCESS',
  GET_JOB_FAILURE: 'GET_JOB_FAILURE',
  CREATE_INTERVIEW: 'CREATE_INTERVIEW',
  CREATE_INTERVIEW_SUCCESS: 'CREATE_INTERVIEW_SUCCESS',
  CREATE_INTERVIEW_FAILURE: 'CREATE_INTERVIEW_FAILURE',
  SEARCH_CANDIDATE: 'SEARCH_CANDIDATE',
  SEARCH_CANDIDATE_SUCCESS: 'SEARCH_CANDIDATE_SUCCESS',
  CREATE_CANDIDATE: 'CREATE_CANDIDATE',
  CREATE_CANDIDATE_SUCCESS: 'CREATE_CANDIDATE_SUCCESS',
  CREATE_CANDIDATE_FAILURE: 'CREATE_CANDIDATE_FAILURE',
};

export const getJob = jobId => async dispatch => {
  dispatch({ type: JOB_ACTIONS.GET_JOB });
  try {
    const respose = await getJobService(jobId);
    dispatch({
      type: JOB_ACTIONS.GET_JOB_SUCCESS,
      data: _get(respose, 'data'),
    });
  } catch (err) {
    dispatch({ type: JOB_ACTIONS.GET_JOB_FAILURE, err });
  }
};

export const createInterview = (interview, closeModal) => async dispatch => {
  dispatch({ type: JOB_ACTIONS.CREATE_INTERVIEW });
  try {
    const respose = await createInterviewService(interview);
    const interviewData = _get(respose, 'data');
    getJob(interviewData.job);
    dispatch({
      type: JOB_ACTIONS.CREATE_INTERVIEW_SUCCESS,
      interview: interviewData,
    });
    closeModal();
  } catch (err) {
    dispatch({ type: JOB_ACTIONS.CREATE_INTERVIEW_FAILURE, err });
    closeModal();
  }
};

export const createCandidate = (candidate, callBack) => async dispatch => {
  dispatch({ type: JOB_ACTIONS.CREATE_CANDIDATE });
  try {
    await createCandidateService(candidate);
    dispatch({
      type: JOB_ACTIONS.CREATE_CANDIDATE_SUCCESS,
    });
    callBack({
      success: {
        message: `Successfully created candidate ${candidate.name}`,
      },
    });
  } catch (err) {
    dispatch({ type: JOB_ACTIONS.CREATE_CANDIDATE_FAILURE, err });
    callBack({
      error: {
        message: `Either Candidate already exist or phone number is not 10 digit`,
      },
    });
  }
};

export const searchCandidate = (searchValue, callBack) => async dispatch => {
  dispatch({ type: JOB_ACTIONS.SEARCH_CANDIDATE });
  try {
    const respose = await searchCandidateService(searchValue);
    dispatch({
      type: JOB_ACTIONS.SEARCH_CANDIDATE_SUCCESS,
      candidates: _get(respose, 'data'),
    });
    callBack('done');
  } catch (err) {
    callBack('done');
    console.log(err);
  }
};
