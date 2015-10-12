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

var serverUrl = 'http://127.0.0.1:4000';

export function applicationLoaded(data) {
  return dispatch => {
    dispatch({
      type: APPLICATION_LOADED,
      data,
    });

    var token = window.localStorage.getItem('dage-token');
    console.log('this is token', JSON.stringify(token));
    return request
      .post(serverUrl + '/userAuth')
      .send({
        token: token,
      })
      .end((err, res={}) => {
        const { body } = res;
        console.log('res.body', res);

        err || res.body.error ?
          dispatch(userFetchError()) :
          dispatch(userFetchSuccess(body));
      });

  };
}

export function submitLogin(data) {
  return dispatch => {
    dispatch({
      type: LOGIN_SUBMITTED,
      payload: { data },
    });

    return request
      .post(serverUrl + '/userLogin')
      .send(data)
      .end((err, res) => {
        if (err) {
          dispatch(loginFailed());
        } else {
          if (res.body.token) {
            window.localStorage.setItem('dage-token', res.body.token);
            window.location.reload();
          } else {
            dispatch(loginFailed());
          }
        }

        // window.location.reload();
      });
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    payload: { error },
  };
}

//body should be server response from
export function userFetchSuccess(body) {
  console.log('user fetch success');
  return {
    type: USER_FETCH_SUCCEEDED,
    payload: {
      body,
      receivedAt: Date.now(),
    },
  };
}

export function userFetchError(error) {
  console.log('user fetch error');
  return {
    type: USER_FETCH_FAILED,
    payload: { error },
  };
}

export function deleteToken(data) {
  window.localStorage.setItem('dage-token', '');
  return dispatch => {
    dispatch({
      type: TOKEN_DELETED,
      payload: { data },
    });

    //Took this out; as requested, only delete the local token in localStorage instead of checking in db
    // return request
    //   .del(/*TODO: fill in with correct token url*/)
    //   .end((err, res) => {
    //     err ?
    //       dispatch(tokenDeleteError()) :
    //       window.location.reload();
    //   });
  };
}

export function deleteTokenError(error) {
  return {
    type: TOKEN_DELETE_FAILED,
    payload: { error },
  };
}
