import request from '../_config/superagent';

import {
  USER_ADD,
  USER_ADD_FAILED,
  USER_TOGGLE_ACTIVE,
  USER_TOGGLE_FAILED,
  USER_PASSSWORD_RESET,
  USER_PASSSWORD_RESET_FAILED,
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

export function userAdd(data) {
  return dispatch => {
    dispatch({
      type: USER_ADD,
      payload: { data },
    });

    return request
      .post(serverUrl + '/userAdd') //TODO: CHECK url
      .send(data)
      .end((err, res) => {
        if (err) {
          dispatch(userAddFailed(err));
        } else {
          //if the server responds back with message='userAdded'
          if (res.body.message === 'userAdded') {
            //reload the page, which should rerun get All Active Users.?????
            window.location.reload();
          } else {
            console.log('Failed to add user');
            dispatch(userAddFailed(err));
          }
        }
      });
  };
}


export function userAddFailed(error) {
  return {
    type: USER_ADD_FAILED,
    payload: { error },
  };
},

export function userToggleActive(username) {
  return dispatch => {
    dispatch({
      type: USER_TOGGLE_ACTIVE,
      payload: { username },
    });

    return request
      .post(serverUrl + 'toggleUser')
      .send(data)
      .end(err, res) => {
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
      }
  };
},

export function userToggleFailed(error) {
  return {
    type: USER_TOGGLE_FAILED,
    payload: { error },
  };
},


export function userPasswordReset(username) {
  return dispatch => {
    dispatch({
      type: USER_PASSSWORD_RESET,
      payload: { username }
    });

    return request
      .post(serverUrl + 'passwordReset')
      .send(username)
      .end(err, res) => {
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
      };
  };
},

export function userPasswordResetFailed(error) {
  return {
    type: USER_PASSSWORD_RESET_FAILED,
    payload: { error },
  };
},


