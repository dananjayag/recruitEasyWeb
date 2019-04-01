import { handleActions } from 'redux-actions';
import { JOB_ACTIONS } from './actions';
import { HOMEPAGE_ACTIONS } from '../RecruitEasy/reacruit-easy.actions';
export const INTIAL_STATE = {
  job: {},
  candidates: [],
  interviews: [],
};

const actions = {
  [JOB_ACTIONS.GET_JOB_SUCCESS]: (
    state,
    { data: { job = {}, interviews = [] } },
  ) => ({
    ...state,
    job,
    interviews,
  }),
  [JOB_ACTIONS.CREATE_INTERVIEW_SUCCESS]: (state, { interview }) => ({
    ...state,
    interviews: [interview, ...state.interviews],
  }),
  [JOB_ACTIONS.SEARCH_CANDIDATE]: state => ({
    ...state,
    candidates: [],
  }),
  [JOB_ACTIONS.SEARCH_CANDIDATE_SUCCESS]: (state, { candidates }) => ({
    ...state,
    candidates: [...candidates],
  }),
  [HOMEPAGE_ACTIONS.LOGOUT_ACTION_SUCCESS]: () => ({}),
};

export default handleActions(actions, INTIAL_STATE);
