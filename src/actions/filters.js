import fetch from 'isomorphic-fetch';

import {
  FILTER_ARRAY_FETCH,
  FILTER_ARRAY_REQUEST,
  FILTER_ARRAY_FETCH_SUCCESS,
  FILTER_ARRAY_FETCH_ERROR,

  FILTER_TYPE_SELECT,

  FILTER_TYPE_ADD,
  FILTER_TYPE_POST_SUCCESS,
  FILTER_TYPE_POST_REQUEST,
  FILTER_TYPE_POST_ERROR,

  FILTER_ADD_FLAG_KEYWORD,
  FILTER_FLAG_POST_SUCCESS,
  FILTER_FLAG_POST_REQUEST,
  FILTER_FLAG_POST_ERROR,
} from 'constants/filters';

export function filterArrayFetch() {
  return dispatch => {
    dispatch(filterArrayRequest());
    return fetch('http://localhost:4000/filterData')
      .then(req => { return req.json() })
      .then(json => { dispatch(filterArrayFetchSuccess(json)) })
  }
}

export function filterArrayRequest() {
  return { type: FILTER_ARRAY_REQUEST };
}

export function filterArrayFetchSuccess(filtersArray) {
  return {
    type: FILTER_ARRAY_FETCH_SUCCESS,
    payload: {
      filtersArray,
      receivedt: Date.now(),
    }
  }
}

export function filterArrayFetchError(error) {
  return {
    type: FILTER_ARRAY_FETCH_ERROR,
    payload: { error },
  }
}

export function filterTypeSelect(filterId) {
  return {
    type: FILTER_TYPE_SELECT,
    payload: { filterId },
  }
}
