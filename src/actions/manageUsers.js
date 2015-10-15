import request from '../_config/superagent';

//todo: add user add success
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

//username, permissionGroup, name, title, email, department, managerID, active

// var data = {
//   username: 'gt',
//   permissionGroup: 'admin',
//   password: 'plaintext',
//   name: 'g t',
//   title: 'administrator' ,
//   email: 'gtd@gt.com',
//   department: 'sales',
//   managerID: '001',
// };

//TODO: CHANGE SERVERURL
var serverUrl = 'http://127.0.0.1:4000';

//TODO: fixme. refer to get user array function below
//userAdd
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

//userToggleActive
export function userToggleActive(username, active) {
  return dispatch => {
    dispatch({
      type: USER_TOGGLE_ACTIVE,
      payload: { username },
    });

    return request
      .post(serverUrl + '/toggleUser')
      .send({ username, active })
      .end((err, res) => {
        if (err) {
          dispatch(userToggleActiveFailed(err));
        } else {
          if (res.body.message === 'User Successfully Toggled') {
            dispatch(userToggleActiveSuccess(username));
          } else {
            console.log('Failed to toggle user');
            dispatch(userToggleActiveFailed(err));
          }
        }
      });
  };
}

export function userToggleActiveSuccess(data) {
  return {
    type: USER_TOGGLE_ACTIVE_SUCCESS,
    payload: { data },
  }
}

export function userToggleActiveFailed(error) {
  return {
    type: USER_TOGGLE_ACTIVE_FAILED,
    payload: { error },
  };
}

//userPasswordReset
export function userPasswordReset(username) {
  return dispatch => {
    dispatch({
      type: USER_PASSWORD_RESET,
      payload: { username },
    });

    return request
      .post(serverUrl + '/passwordReset')
      .send({ username })
      .end((err, res) => {
        if (err) {
          dispatch(userPasswordResetFailed(err));
        } else {
          if (res.body.message === 'Password Successfully Resetted') {
            dispatch(userPasswordResetSuccess(res.body));
          } else {
            console.log('Failed to reset user password');
            dispatch(userPasswordResetFailed(err));
          }
        }
      });
  };
}

export function userPasswordResetSuccess(data) {
  return {
    type: USER_PASSWORD_RESET_SUCCESS,
    payload: { data },
  }
}


export function userPasswordResetFailed(error) {
  return {
    type: USER_PASSWORD_RESET_FAILED,
    payload: { error },
  };
}

//userArrayRequest
export function userArrayRequest() {
  console.log('userArrayRequest triggered')
  return dispatch => {
    dispatch({
      type: USER_ARRAY_REQUEST,
    });

    return request
      .get(serverUrl + '/getAllUsers')
      .end((err, res) => {
        if(err){
          dispatch(userArrayRequestFailed(err));
        }else {
          //how to send mesage inside body?
          if(res.body.message = 'got all users') {
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
    type: USER_ARRAY_REQUEST_FAILED,
    payload: { error },
  };
}

export function addUserToState(userState){
  return {
    type: ADD_USER_TO_STATE,
    payload: { userState }
  };
}
