import { createReducer } from 'utils';
import {
  NAVIGATION_ROUTE_SELECT,
} from 'constants/navigation';

const initialState = {
  currentPage: 'dashboard',
  history: [],
}

export default createReducer(initialState, {

  [NAVIGATION_ROUTE_SELECT]: (state, payload) => {
    let newHistory = state.history.slice();
    newHistory.push(payload.route);
    return { ...state,
      currentPage: payload.route,
      history: newHistory,
    }
  },
});
