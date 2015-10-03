import {
  EMAIL_ARRAY_FETCH,
  EMAIL_ARRAY_FETCH_SUCCESS,
  EMAIL_ARRAY_FETCH_ERROR,
  EMAIL_SHOW_ONE_FLAG,
  EMAIL_SHOW_ALL_FLAGS,
  EMAIL_SHOW_EMAIL,
} from 'constants/email';

export function emailArrayFetch() {
  return {
    type: EMAIL_ARRAY_FETCH,
  }
}
export function emailArrayFetchSuccess(response) {
  return {
    type: EMAIL_ARRAY_FETCH_SUCCESS,
    response,
  }
}
export function emailArrayFetchError(error) {
  return {
    type: EMAIL_ARRAY_FETCH_ERROR,
    error,
  }
}
export function emailShowOneFlag(emailId) {
  console.log('actionShowOneFlag', emailId)
  return {
    type: EMAIL_SHOW_ONE_FLAG,
    payload: { emailId },
  }
}
export function emailShowAllFlags() {
  return {
    type: EMAIL_SHOW_ALL_FLAGS,
  }
}
export function emailShowEmail() {
  return {
    type: EMAIL_SHOW_EMAIL,
  }
}
