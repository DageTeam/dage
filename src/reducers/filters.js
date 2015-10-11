import { createReducer } from 'utils';
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

const filtersArray = [
  {
    "id":1,                         //value
    "userID":1,
    "filterName":"anthonys filter", //label
    "keyWord":["shit","fuck"],
    "username":"anthony"
  },
];

const filters = {
  isFetchingFilters: false,
  lastUpdated: 0,
  fetchingEmailError: '',
  filterOptions: [],
  filterTypeSelected: 1,
  filtersArray,
  flagOptionsObject: {},
  flagOptionsCurrent: [],
}

const initialState = filters;

export default createReducer(initialState, {

  [FILTER_ARRAY_REQUEST]: (state, payload) => {
    return { ...state,
      isFetchingFilters: true,
    }
  },
  [FILTER_ARRAY_FETCH_SUCCESS]: (state, payload) => {
    let filterOptions = [];
    let flagOptionsObject = {};
    payload.filtersArray.forEach(filter => {
      filterOptions.push({ value: filter.id, label: filter.filterName })
      flagOptionsObject[filter.id] = filter.keyword.map(keywordObj => {
        return { value: keywordObj.keywordID, label: keywordObj.keyword };
      })
    })
    return { ...state,
      _console: flagOptionsObject[1],
      isFetchingFilters: false,
      lastUpdated: payload.receivedAt,
      filtersArray: payload.filtersArray,
      filterOptions,
      flagOptionsObject,
      // flagOptionsCurrent: flagOptionsObject[// selected filter.id],
      flagOptionsCurrent: flagOptionsObject[state.filterTypeSelected],
    }
  },
  [FILTER_ARRAY_FETCH_ERROR]: (state, payload) => {
    return { ...state,

    }
  },

  [FILTER_TYPE_SELECT]: (state, payload) => {
    return { ...state,
      filterTypeSelected: payload.filterId,
    }
  },

  [FILTER_TYPE_ADD]: (state, payload) => {
    return { ...state,

    }
  },
  [FILTER_TYPE_POST_SUCCESS]: (state, payload) => {
    return { ...state,

    }
  },
  [FILTER_TYPE_POST_REQUEST]: (state, payload) => {
    return { ...state,

    }
  },
  [FILTER_TYPE_POST_ERROR]: (state, payload) => {
    return { ...state,

    }
  },

  [FILTER_ADD_FLAG_KEYWORD]: (state, payload) => {
    return { ...state,

    }
  },
  [FILTER_FLAG_POST_SUCCESS]: (state, payload) => {
    return { ...state,

    }
  },
  [FILTER_FLAG_POST_REQUEST]: (state, payload) => {
    return { ...state,

    }
  },
  [FILTER_FLAG_POST_ERROR]: (state, payload) => {
    return { ...state,

    }
  },

});
