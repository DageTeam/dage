import { createReducer } from 'utils';
import {
  // EMAIL_ARRAY_FETCH,
  EMAIL_ARRAY_REQUEST,
  EMAIL_ARRAY_FETCH_SUCCESS,
  EMAIL_ARRAY_FETCH_ERROR,
  EMAIL_SHOW_ONE_FLAG,
  EMAIL_SHOW_ALL_FLAGS,
  EMAIL_SHOW_COMPLETE,
  REQUESTING_EMAIL_UNFLAG,
  EMAIL_UNFLAG_ERROR,
  EMAIL_UNFLAG_SUCCESS,
} from 'constants/emails';

const emailsArray = [
  {
    id: 'emailId',
    sender: 'emailSender',
    recipient: 'emailRecipient',
    subject: 'subjectString',
    body: 'bodyString',
    sendTime: 1000,
    focusLevel: 'complete',
    flags:
      [
        {
          type: 'flagTypeString1',
          context: 'contextString1',
        },
        {
          type: 'flagTypeString2',
          context: 'contextString2',
        },
      ],
  },
];

const emails = {
  isFetchingEmail: false,
  lastUpdated: 0,
  fetchingEmailError: '',
  emailsArray,
};

const initialState = emails;

export default createReducer(initialState, {
  // [COUNTER_INCREMENT] : (state) => state + 1
  // [EMAIL_ARRAY_FETCH]: (state, payload) => {
  //   return state;
  // },

  [EMAIL_ARRAY_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetchingEmail: true,
    });
  },

  [EMAIL_ARRAY_FETCH_SUCCESS]: (state, payload) => {
    console.log('email array fetch success triggered');
    return Object.assign({}, state, {
      isFetchingEmail: false,
      lastUpdated: payload.receivedAt,
      emailsArray: payload.emailsArray,
    });
  },

  [EMAIL_ARRAY_FETCH_ERROR]: (state, payload) => {
    return state;
  },

  [EMAIL_SHOW_ONE_FLAG]: (state, payload) => {
    let newState = Object.assign({}, state);
    let { emailId } = payload;
    newState.emailsArray.forEach((email, index, list) => {
      if (emailId === email.id) {
        list[index].focusLevel = 'one';
      }
    });
    return newState;
  },

  [EMAIL_SHOW_ALL_FLAGS]: (state, payload) => {
    let newState = Object.assign({}, state);
    let { emailId } = payload;
    newState.emailsArray.forEach((email, index, list) => {
      if (emailId === email.id) {
        list[index].focusLevel = 'allFlags';
      }
    });
    return newState;
  },

  [EMAIL_SHOW_COMPLETE]: (state, payload) => {
    let newState = Object.assign({}, state);
    let { emailId } = payload;
    newState.emailsArray.forEach((email, index, list) => {
      if (emailId === email.id) {
        list[index].focusLevel = 'complete';
      }
    });
    return newState;
  },

  [REQUESTING_EMAIL_UNFLAG]: (state, payload) => {
    return {
      ...state,
      unflaggingEmailID: payload.emailID,
    };
  },

  [EMAIL_UNFLAG_ERROR]: (state, payload) => {
    return {
      ...state,
      unflaggingEmailError: payload.error,
    };
  },

  [EMAIL_UNFLAG_SUCCESS]: (state, payload) => {
    return {
      ...state,
    };
  },

});
