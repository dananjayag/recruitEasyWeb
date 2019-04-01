import _get from 'lodash/get';
import { notification } from 'antd';
import {
  getInterviewService,
  updateInterviewService,
  scheduleInterviewService,
} from './service';
export const INTERVIEW_ACTIONS = {
  UPDATE_INTERVIEW: 'UPDATE_INTERVIEW',
  UPDATE_INTERVIEW_SUCCESS: 'UPDATE_INTERVIEW_SUCCESS',
  UPDATE_INTERVIEW_FAILURE: 'UPDATE_INTERVIEW_FAILURE',
  GET_INTERVIEW: 'GET_INTERVIEW',
  GET_INTERVIEW_SUCCESS: 'GET_INTERVIEW_SUCCESS',
  GET_INTERVIEW_FAILURE: 'GET_INTERVIEW_SUCCESS',
  SCHEDULE_INTERVIEW: 'SCHEDULE_INTERVIEW',
  SCHEDULE_INTERVIEW_SUCCESS: 'SCHEDULE_INTERVIEW_SUCCESS',
  SCHEDULE_INTERVIEW_FAILURE: 'SCHEDULE_INTERVIEW_FAILURE',
};

export const getInterview = interviewId => async dispatch => {
  dispatch({ type: INTERVIEW_ACTIONS.GET_INTERVIEW });
  try {
    const respose = await getInterviewService(interviewId);
    dispatch({
      type: INTERVIEW_ACTIONS.GET_INTERVIEW_SUCCESS,
      data: _get(respose, 'data'),
    });
  } catch (err) {
    dispatch({ type: INTERVIEW_ACTIONS.GET_JOB_FAILURE, err });
  }
};

export const updateInterview = interview => async dispatch => {
  dispatch({ type: INTERVIEW_ACTIONS.UPDATE_INTERVIEW });
  try {
    await updateInterviewService(interview);
    dispatch({
      type: INTERVIEW_ACTIONS.UPDATE_INTERVIEW_SUCCESS,
      status: interview.status,
    });
    notification.success({
      message: 'Success!!',
      description: 'updated Status Sucessfully',
    });
  } catch (err) {
    dispatch({ type: INTERVIEW_ACTIONS.UPDATE_INTERVIEW_FAILURE, err });
    notification.error({
      message: 'Error',
      description: "Couldn't update Status",
    });
  }
};

export const scheduleInterview = interview => async dispatch => {
  dispatch({ type: INTERVIEW_ACTIONS.SCHEDULE_INTERVIEW });
  try {
    await scheduleInterviewService(interview);
    dispatch({
      type: INTERVIEW_ACTIONS.SCHEDULE_INTERVIEW_SUCCESS,
      status: interview.status,
    });
    notification.success({
      message: 'Success!!',
      description: 'Scheduled Interview Sucessfully',
    });
  } catch (err) {
    dispatch({ type: INTERVIEW_ACTIONS.SCHEDULE_INTERVIEW_FAILURE, err });
    notification.error({
      message: 'Error',
      description: "Couldn't Schedule Interview Please Email The Candidate",
    });
  }
};

// export const createInterview = (interview, closeModal) => async dispatch => {
//   dispatch({ type: JOB_ACTIONS.CREATE_INTERVIEW });
//   try {
//     const respose = await createInterviewService(interview);
//     const interviewData = _get(respose, 'data');
//     getJob(interviewData.job);
//     dispatch({
//       type: JOB_ACTIONS.CREATE_INTERVIEW_SUCCESS,
//       interview: interviewData,
//     });
//     closeModal();
//   } catch (err) {
//     dispatch({ type: JOB_ACTIONS.CREATE_INTERVIEW_FAILURE, err });
//     closeModal();
//   }
// };

// export const createCandidate = (candidate, callBack) => async dispatch => {
//   dispatch({ type: JOB_ACTIONS.CREATE_CANDIDATE });
//   try {
//     await createCandidateService(candidate);
//     dispatch({
//       type: JOB_ACTIONS.CREATE_CANDIDATE_SUCCESS,
//     });
//     callBack({
//       success: {
//         message: `Successfully created candidate ${candidate.name}`,
//       },
//     });
//   } catch (err) {
//     dispatch({ type: JOB_ACTIONS.CREATE_CANDIDATE_FAILURE, err });
//     callBack({
//       error: {
//         message: `Either Candidate already exist or phone number is not 10 digit`,
//       },
//     });
//   }
// };

// export const searchCandidate = (searchValue, callBack) => async dispatch => {
//   dispatch({ type: JOB_ACTIONS.SEARCH_CANDIDATE });
//   try {
//     const respose = await searchCandidateService(searchValue);
//     dispatch({
//       type: JOB_ACTIONS.SEARCH_CANDIDATE_SUCCESS,
//       candidates: _get(respose, 'data'),
//     });
//     callBack('done');
//   } catch (err) {
//     callBack('done');
//     console.log(err);
//   }
// };
