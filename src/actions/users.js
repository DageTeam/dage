import request from '../_config/superagent';

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
} from 'constants/users';

//invoked on application load. Assumes user is auth'd. Sends GET request to server for a given user--
//if user is not auth'd, would ideally redirect to a login page (in this case, sense dispatch for userFetchError)

export function applicationLoaded(data) {
  return dispatch => {
    dispatch({
      type: APPLICATION_LOADED,
      data,
    });

    return request
      .get(/*TODO: fill in with correct user (NOT TOKEN!) url*/)
      .end((err, res={}) => {
        const { body } = res;

        err ?
          dispatch(userFetchError()) :
          dispatch(userFetchSuccess(body));
      });
  };
}

export function submitLogin() {
  return dispatch => {
    dispatch({
      type: LOGIN_SUBMITTED,
      payload: { data },
    });

    return request
      .post(/*TODO: fill in with correct token url*/)
      .send(JSON.stringify(data))
      .end((err, res) => {
        err ?
          dispatch(loginFailed()) :
          window.location.reload();
      });
  };
}


export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    payload: { error },
  };
}

export function userFetchSuccess(token) {
  return {
    type: USER_FETCH_SUCCEEDED,
    payload: {
      token,
      receivedAt: Date.now(),
    },
  }
}

export function userFetchError(error) {
  return {
    type: USER_FETCH_FAILED,
    payload: { error },
  }
}

export function deleteToken(data) {
  return dispatch => {
    dispatch({
      type: TOKEN_DELETED,
      payload: { data },
    });

    //FIXME
    return request
      .del(/*TODO: fill in with correct token url*/)
      .end((err, res) => {
        err ?
          dispatch(tokenDeleteError()) :
          window.location.reload();
      });
  };
}

export function deleteTokenError(error) {
  return {
    type: TOKEN_DELETE_FAILED,
    payload: { error },
  };
}
