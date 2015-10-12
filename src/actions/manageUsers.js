import request from '../_config/superagent';

import {
  USER_ADD,
  USER_DELETE,
  USER_TOGGLE_ACTIVE,
} from 'constants/manageUsers';

export function userAdd(username, permissionGroup, name, title, email, department, managerID, active) {
  return {
    type: USER_ADD,
    payload: {
      username,
      permissionGroup,
      name,
      title,
      email,
      department,
      managerID,
      active
    },
  };
}

export function userDelete(username) {
  return {
    type: USER_DELETE,
    payload: { username },
  };
}

export function userToggleActive(username) {
  return {
    type: USER_TOGGLE_ACTIVE,
    payload: { username },
  };
}

