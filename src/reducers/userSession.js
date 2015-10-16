import * as constants from '../constants/emails.js';

import { createReducer } from 'utils';
import {
  APPLICATION_LOADED,
  LOGIN_SUBMITTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  USER_FETCHED,
  USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILED,
  TOKEN_DELETED,
  TOKEN_DELETE_SUCCEEDED,
  TOKEN_DELETE_FAILED,
} from 'constants/userSession';

const initialState = {
  authenticated: false,
  username: null,
  applicationLoading: false
};

export default createReducer(initialState, {
  [APPLICATION_LOADED]: (state, payload) => {
    return {
      ...state,
      applicationLoading: true
    }
  },

  [USER_FETCH_SUCCEEDED]: (state, payload) => {
    return {
      ...state,
      authenticated: true,
      username: payload.body.username,
      permissionGroup: payload.body.permissionGroup,
      applicationLoading: false
    };
  },

  [USER_FETCH_FAILED]: (state, payload) => {
    return {
      ...state,
      authenticated: false,
      fetchingUserError: payload.error,
    };
  },

  [LOGIN_SUBMITTED]: (state, payload) => {
    return {
      ...state,
      isLoggingIn: true,
    };
  },

  [LOGIN_SUCCEEDED]: (state, payload) => {
    return {
      ...state,
      isLoggingIn: false,
    };
  },

  [LOGIN_FAILED]: (state, payload) => {
    return {
      ...state,
      isLoggingIn: false,
      loggingInError: payload.error,
    };
  },

  [TOKEN_DELETED]: (state, payload) => {
    return {
      ...state,
      authenticated: false,
      isDeletingToken: true,
    };
  },

  [TOKEN_DELETE_SUCCEEDED]: (state, payload) => {
    return {
      ...state,
      authenticated: false,
      isDeletingToken: false,
    };
  },

});

