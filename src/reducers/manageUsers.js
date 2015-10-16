import { createReducer } from 'utils';
//TODO: add user_add_sccuess to here and the constants file
import {
  USER_ADD,
  USER_ADD_SUCCESS,
  USER_ADD_FAILED,

  USER_TOGGLE_ACTIVE,
  USER_TOGGLE_ACTIVE_SUCCESS,
  USER_TOGGLE_ACTIVE_FAILED,

  USER_PASSWORD_RESET,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAILED,

  USER_ARRAY_REQUEST,
  USER_ARRAY_REQUEST_SUCCESS,
  USER_ARRAY_REQUEST_FAILED,

  ADD_USER_TO_STATE
} from 'constants/manageUsers';

const initialState = {
  authenticated: false,
  username: null
};

export default createReducer(initialState, {
//USER_ADD
  [USER_ADD]: (state, payload) => {
    console.log('user_add reducer fx triggered');
    return {
      ...state,
      userData: payload.data,
    };
  },
  [USER_ADD_SUCCESS]: (state, payload) => {
    console.log('useraddsuccess triggered');
    return {
      ...state,
      userData: payload.data,
    }
  },
  [USER_ADD_FAILED]: (state, payload) => {
    return {
      ...state,
      userAddError: payload.error,
    }
  },
//USER_TOGGLE_ACTIVE
  [USER_TOGGLE_ACTIVE]: (state, payload) => {
    return {
      ...state,
      username: payload.username,
    };
  },
  [USER_TOGGLE_ACTIVE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      username: payload.username,
    };
  },
  [USER_TOGGLE_ACTIVE_FAILED]: (state, payload) => {
    return {
      ...state,
      userToggleError: payload.error,
    };
  },
//USER_PASSWORD_RESET
  [USER_PASSWORD_RESET]: (state, payload) => {
    console.log('reducer', payload.username)
    return {
      ...state,
      username: payload.username,
    };
  },
  [USER_PASSWORD_RESET_SUCCESS]: (state, payload) => {
    return {
      ...state,
      username: payload.username,
    };
  },
  [USER_PASSWORD_RESET_FAILED]: (state, payload) => {
    return {
      ...state,
      userPasswordResetError: payload.error,
    };
  },
//USER_ARRAY_REQUEST
  [USER_ARRAY_REQUEST]: (state, payload) => {
    return {
      ...state,
    };
  },
  [USER_ARRAY_REQUEST_SUCCESS]: (state, payload) => {
    console.log('userArrayRequestSuccess Ran!');
    return {
      ...state,
      userArray: payload.data.userArray,
    }
  },
  [USER_ARRAY_REQUEST_FAILED]: (state, payload) => {
    return {
      ...state,
      userArrayRequestError: payload.error,
    };
  },
//ADD_USER_TO_STATE    
  [ADD_USER_TO_STATE]: (state, payload) => {
    return {
      ...state,
      userState: payload.userState,
    }
  }

});
