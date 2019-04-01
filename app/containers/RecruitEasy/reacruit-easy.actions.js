import { cookieKeys, cookies } from 'utils/cookies';
import _get from 'lodash/get';
import { callLogin } from './reacruit-easy.service';
export const HOMEPAGE_ACTIONS = {
  LOGIN_ACTIONS_SUCCESS: 'LOGIN_ACTIONS_SUCCESS',
  LOGIN_ACTIONS_FAILURE: 'LOGIN_ACTIONS_FAILURE',
  LOGIN_ACTIONS_POST: 'LOGIN_ACTIONS_POST',
  LOGOUT_ACTION: 'LOGOUT_ACTION',
  LOGOUT_ACTION_FAILURE: 'LOGOUT_ACTION_FAILURE',
  LOGOUT_ACTION_SUCCESS: 'LOGOUT_ACTION_SUCCESS',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

export const login = body => async dispatch => {
  dispatch({ type: HOMEPAGE_ACTIONS.LOGIN_ACTIONS_POST });
  try {
    const response = await callLogin(body);
    const token = _get(response.data, 'token');
    cookies.set(cookieKeys.TOKEN, token);
    dispatch({ type: HOMEPAGE_ACTIONS.LOGIN_ACTIONS_SUCCESS, token });
  } catch (err) {
    dispatch({
      type: HOMEPAGE_ACTIONS.LOGIN_ACTIONS_FAILURE,
      loginError: 'Error',
    });
  }
};

export const logOut = () => async dispatch => {
  dispatch({ type: HOMEPAGE_ACTIONS.LOGOUT_ACTION });
  try {
    cookies.set(cookieKeys.TOKEN, '');
    dispatch({ type: HOMEPAGE_ACTIONS.LOGOUT_ACTION_SUCCESS, token: '' });
  } catch (err) {
    dispatch({ type: HOMEPAGE_ACTIONS.LOGIN_ACTIONS_FAILURE });
  }
};

export const clearError = () => async dispatch => {
  dispatch({ type: HOMEPAGE_ACTIONS.CLEAR_ERROR, loginError: '' });
};
