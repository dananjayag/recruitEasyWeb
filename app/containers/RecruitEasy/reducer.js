import { handleActions } from 'redux-actions';
import { cookieKeys, cookies } from 'utils/cookies';
import { HOMEPAGE_ACTIONS } from './reacruit-easy.actions';
export const INTIAL_STATE = {
  token: cookies.get(cookieKeys.TOKEN) || null,
};

const actions = {
  [HOMEPAGE_ACTIONS.LOGIN_ACTIONS_SUCCESS]: (state, { token }) => ({
    token,
  }),
  [HOMEPAGE_ACTIONS.LOGIN_ACTIONS_FAILURE]: (state, { loginError }) => ({
    loginError,
  }),
  [HOMEPAGE_ACTIONS.LOGOUT_ACTION_SUCCESS]: (state, { token }) => ({
    token,
  }),
  [HOMEPAGE_ACTIONS.CLEAR_ERROR]: (state, { loginError }) => ({
    loginError,
  }),
};

export default handleActions(actions, INTIAL_STATE);
