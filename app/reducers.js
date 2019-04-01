/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import auth from 'containers/RecruitEasy/reducer';
import dashboard from 'containers/DashBoard/reducer';
import jobView from 'containers/Job/reducer';
import interviewView from 'containers/Interview/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    auth,
    dashboard,
    jobView,
    interviewView,
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
