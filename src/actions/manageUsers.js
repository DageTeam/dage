import request from '../_config/superagent';

//todo: add user add success
import {
  USER_ADD,
  USER_ADD_FAILED,
  USER_TOGGLE_ACTIVE,
  USER_TOGGLE_FAILED,
  USER_PASSSWORD_RESET,
  USER_PASSSWORD_RESET_FAILED,
  USER_ARRAY_REQUEST,
  USER_ARRAY_FETCH_SUCCESS,
  USER_ARRAY_FETCH_ERROR,
  USER_ARRAY_REQUEST_SUCCESS,
  USER_ADD_SUCCESS,
} from 'constants/manageUsers';

//username, permissionGroup, name, title, email, department, managerID, active
/* data =
  username,
  permissionGroup,
  name,
  title,
  email,
  department,
  managerID,
  active
*/

//TODO: CHANGE SERVERURL
var serverUrl = 'http://127.0.0.1:4000';

//TODO: fixme. refer to get user array function below
export function userAdd(data) {
  return dispatch => {
    dispatch({
      type: USER_ADD,
      payload: { data },
    });

    return request
      .post(serverUrl + '/userAdd')
      .send(data)
      .end((err, res) => {
        if (err) {
          dispatch(userAddFailed(err));
        } else {
          //if the server responds back with message='userAdded'
          //TODO: ADD SERVER CODE...
          if (res.body.message === 'user added') {
            dispatch(userAddSuccess(data));
          } else {
            console.log('Failed to add user');
            dispatch(userAddFailed(err));
          }
        };
      })
  }
}

export function userAddSuccess(data) {
  return {
    type: USER_ADD_SUCCESS,
    payload: { data },
  }
}

export function userAddFailed(error) {
  return {
    type: USER_ADD_FAILED,
    payload: { error },
  };
}


export function userToggleActive(username) {
  return dispatch => {
    dispatch({
      type: USER_TOGGLE_ACTIVE,
      payload: { username },
    });

    return request
      .post(serverUrl + 'toggleUser')
      .send(data)
      .end((err, res) => {
        if (err) {
          dispatch(userToggleActiveFailed(err));
        } else {
          //if the server responds back with message='userToggled'
          if (res.body.message === 'userAdded') {
            //reload the page, which should rerun get All Active Users.?????
            window.location.reload();
          } else {
            console.log('Failed to toggle user');
            dispatch(userToggleActiveFailed(err));
          }
        }
      });
  };
}

export function userToggleFailed(error) {
  return {
    type: USER_TOGGLE_FAILED,
    payload: { error },
  };
}


export function userPasswordReset(username) {
  return dispatch => {
    dispatch({
      type: USER_PASSSWORD_RESET,
      payload: { username }
    });

    return request
      .post(serverUrl + 'passwordReset')
      .send(username)
      .end((err, res) => {
        if (err) {
          dispatch(userPasswordResetFailed(err));
        } else {
          //if the server responds back with message = 'passwordResetted'
          if (res.body.message === 'passwordResetted') {
            window.location.reload();
          } else {
            console.log('Failed to reset user password');
            dispatch(userPasswordResetFailed(err));
          }
        }
      });
  };
}

export function userPasswordResetFailed(error) {
  return {
    type: USER_PASSSWORD_RESET_FAILED,
    payload: { error },
  };
}

export function userArrayRequest() {
  console.log('userArrayRequest triggered')
  return dispatch => {
    dispatch({
      type: USER_ARRAY_REQUEST,
    });

    return request
      .get(serverUrl + '/getAllUsers')
      .end((err, res) => {
        console.log('this is the server response', res.body);
        if(err){
          dispatch(userArrayRequestFailed(err));
        }else {
          //how to send mesage inside body?
          if(res.body.message = 'got all active users') {
            //send the res.body down the food chain
            dispatch(userArrayRequestSuccess(res.body))
          } else {
            dispatch(userArrayRequestFailed(err));
          }
        }
      })
  }
}

export function userArrayRequestSuccess(data) {
  return {
    type: USER_ARRAY_REQUEST_SUCCESS,
    payload: { data },
  }
}

export function userArrayRequestFailed(error) {
  return {
    type: USER_ARRAY_REQUEST_ERROR,
    payload: { error },
  };
}
