import { handleActions } from 'redux-actions';
import { DASHBOARD_ACTIONS } from './actions';
import { HOMEPAGE_ACTIONS } from '../RecruitEasy/reacruit-easy.actions';
export const INTIAL_STATE = {
  jobs: [],
};

const actions = {
  [DASHBOARD_ACTIONS.GET_JOBS_SUCCESS]: (state, { jobs }) => ({
    jobs,
  }),
  [DASHBOARD_ACTIONS.CREATE_JOB_SUCCESS]: (state, { job }) => ({
    jobs: [job, ...state.jobs],
  }),
  [HOMEPAGE_ACTIONS.LOGOUT_ACTION_SUCCESS]: () => ({}),
};

export default handleActions(actions, INTIAL_STATE);
