import { handleActions } from 'redux-actions';
import { INTERVIEW_ACTIONS } from './actions';
import { HOMEPAGE_ACTIONS } from '../RecruitEasy/reacruit-easy.actions';
export const INTIAL_STATE = {
  interview: {},
};

const actions = {
  [INTERVIEW_ACTIONS.UPDATE_INTERVIEW_SUCCESS]: (state, { status }) => ({
    ...state,
    interview: { ...state.interview, status },
  }),
  [INTERVIEW_ACTIONS.GET_INTERVIEW_SUCCESS]: (
    state,
    { data: { interview = {} } },
  ) => ({
    ...state,
    interview,
  }),
  [HOMEPAGE_ACTIONS.LOGOUT_ACTION_SUCCESS]: () => ({}),
};

export default handleActions(actions, INTIAL_STATE);
