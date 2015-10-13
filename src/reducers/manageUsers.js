import { createReducer } from 'utils';
import {
  USER_ADD,
  USER_DELETE,
  USER_TOGGLE_ACTIVE,
} from 'constants/manageUsers';

const initialState = {
  authenticated: false,
  username: null
};

export default createReducer(initialState, {
  [USER_ADD]: (state, payload) => {
    console.log('user_add reducer fx triggered');
    return {
      ...state,
      data: payload.data
    };
  },
  [USER_ADD_FAILED]: (state, payload) => {
    return {
      ...state,
      userAddError: payload.error,
    },
  },
  [USER_TOGGLE_ACTIVE]: (state, payload) => {
    return {
      ...state,
      username: payload.username,
    };
  },
  [USER_TOGGLE_FAILED]: (state, payload) => {
    return {
      ...state,
      userToggleError: payload.error,
    };
  },
  [USER_PASSSWORD_RESET]: (state, payload) => {
    return {
      ...state,
      username: payload.username,
    };
  },
  [USER_PASSSWORD_RESET_FAILED]: (state, payload) => {
    return {
      ...state,
      userPasswordResetError: payload.error,
    };
  },
});
