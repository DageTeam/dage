import fetch from 'isomorphic-fetch';

import {
  NAVIGATION_ROUTE_SELECT,
} from 'constants/navigation';

export function navigationRouteSelect(route) {
  return {
    type: NAVIGATION_ROUTE_SELECT,
    payload: { route },
  }
}
