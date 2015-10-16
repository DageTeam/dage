import fetch from 'isomorphic-fetch';

import {
  NAVIGATION_ROUTE_SELECT,
} from 'constants/navigation';

import {
  allEmailArrayFetch,
  emailArrayFetch,
} from './emails';

export function navigationRouteSelect(route) {
  if (route === 'allEmails') {
    return dispatch=> {
      dispatch(allEmailArrayFetch());
      dispatch({
        type: NAVIGATION_ROUTE_SELECT,
        payload: { route },
      });
    };
  } else if (route === 'MLEmails') {
    return dispatch => {
      dispatch(allEmailArrayFetch());
      dispatch({
          type: NAVIGATION_ROUTE_SELECT,
          payload: { route },
        });
    };
  } else if (route === 'alerts') {
    return dispatch => {
      dispatch(emailArrayFetch());
      dispatch({
        type: NAVIGATION_ROUTE_SELECT,
        payload: { route },
      });
    };
  } else {
    return {
      type: NAVIGATION_ROUTE_SELECT,
      payload: { route },
    };
  }
}
