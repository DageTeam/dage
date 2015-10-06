import fetch from 'isomorphic-fetch';

import {
  EMAIL_ARRAY_FETCH,
  EMAIL_ARRAY_REQUEST,
  EMAIL_ARRAY_FETCH_SUCCESS,
  EMAIL_ARRAY_FETCH_ERROR,
  EMAIL_SHOW_ONE_FLAG,
  EMAIL_SHOW_ALL_FLAGS,
  EMAIL_SHOW_COMPLETE,
} from 'constants/emails';

export function emailArrayFetch() {
  return dispatch => {
    dispatch(emailArrayRequest())
    return fetch('http://localhost:4000/tempEmailData')
      .then(req => { return req.json() })
      .then(json => { dispatch(emailArrayFetchSuccess(json)) })
  }
}
export function emailArrayRequest() {
  return {
    type: EMAIL_ARRAY_REQUEST,
  }
}
export function emailArrayFetchSuccess(emailsArray) {
  return {
    type: EMAIL_ARRAY_FETCH_SUCCESS,
    payload: {
      emailsArray,
      receivedAt: Date.now(),
    },
  }
}
export function emailArrayFetchError(error) {
  return {
    type: EMAIL_ARRAY_FETCH_ERROR,
    payload: { error },
  }
}
export function emailShowOneFlag(emailId) {
  console.log('actionShowOneFlag', emailId)
  return {
    type: EMAIL_SHOW_ONE_FLAG,
    payload: { emailId },
  }
}
export function emailShowAllFlags(emailId) {
  return {
    type: EMAIL_SHOW_ALL_FLAGS,
    payload: { emailId },
  }
}
export function emailShowComplete(emailId) {
  return {
    type: EMAIL_SHOW_COMPLETE,
    payload: { emailId },
  }
}
