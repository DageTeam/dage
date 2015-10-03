import { createReducer } from 'utils';
import {
  EMAIL_ARRAY_FETCH,
  EMAIL_ARRAY_FETCH_SUCCESS,
  EMAIL_ARRAY_FETCH_ERROR,
  EMAIL_SHOW_ONE_FLAG,
  EMAIL_SHOW_ALL_FLAGS,
  EMAIL_SHOW_EMAIL,
} from 'constants/email';

const initialState = [
  {
    id: 'emailId',
    sender: 'emailSender',
    recipient: 'emailRecipient',
    subject: 'subjectString',
    body: 'bodyString',
    sendTime: 1000,
    focusLevel: '',
    flags:
      [
        {
          type: 'flagTypeString',
          context: 'contextString',
        },
        {
          type: 'flagTypeString',
          context: 'contextString',
        },
      ],
  },
];

export default createReducer(initialState, {
  // [COUNTER_INCREMENT] : (state) => state + 1
  [EMAIL_ARRAY_FETCH]: (state, payload) => {
    return state;
  },

  [EMAIL_ARRAY_FETCH_SUCCESS]: (state, payload) => {
    return state;
  },

  [EMAIL_ARRAY_FETCH_ERROR]: (state, payload) => {
    return state;
  },

  [EMAIL_SHOW_ONE_FLAG]: (state, payload) => {
    return state;
  },

  [EMAIL_SHOW_ALL_FLAGS]: (state, payload) => {
    return state;
  },

  [EMAIL_SHOW_EMAIL]: (state, payload) => {
    return state;
  },

});
