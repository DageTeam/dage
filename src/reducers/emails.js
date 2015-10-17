import { createReducer } from 'utils';
import {
  // EMAIL_ARRAY_FETCH,
  EMAIL_ARRAY_REQUEST,
  EMAIL_ARRAY_FETCH_SUCCESS,
  EMAIL_ARRAY_FETCH_ERROR,

  ALL_EMAIL_FETCH_REQUEST,
  ALL_EMAIL_FETCH_SUCCESS,
  ALL_EMAIL_FETCH_ERROR,

  ML_EMAIL_FETCH_REQUEST,
  ML_EMAIL_FETCH_SUCCESS,
  ML_EMAIL_FETCH_ERROR,

  CLEAR_ALL_EMAILS_CACHE,

  EMAIL_SHOW_ONE_FLAG,
  EMAIL_SHOW_ALL_FLAGS,
  EMAIL_SHOW_COMPLETE,

  ALL_EMAILS_SHOW_ONE_FLAG,
  ALL_EMAILS_SHOW_ALL_FLAGS,
  ALL_EMAILS_SHOW_COMPLETE,

  REQUESTING_EMAIL_UNFLAG,
  EMAIL_UNFLAG_ERROR,
  EMAIL_UNFLAG_SUCCESS,
  EMAIL_MARK_READ_REQUEST,
  EMAIL_MARK_READ_SUCCESS,

} from 'constants/emails';

// const emailsArray = [
//   {
//     id: 'emailId',
//     sender: 'emailSender',
//     recipient: 'emailRecipient',
//     subject: 'subjectString',
//     body: 'bodyString',
//     sendTime: 1000,
//     focusLevel: 'complete',
//     flags:
//       [
//         {
//           type: 'flagTypeString1',
//           context: 'contextString1',
//         },
//         {
//           type: 'flagTypeString2',
//           context: 'contextString2',
//         },
//       ],
//   },
// ];

const emails = {
  isFetchingEmail: true,
  isFetchingAllEmails: false,
  isFetchingMLEmails: false,
  lastUpdated: 0,
  fetchingEmailError: '',
  emailsArray: [],
  allEmailsArray: [],
  MLEmailsArray: [],
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

  [ALL_EMAIL_FETCH_REQUEST]: (state, payload) => {
    return {
      ...state,
      isFetchingAllEmails: true,
    }
  },

  [ALL_EMAIL_FETCH_SUCCESS]: (state, payload) => {
    console.log('inside all email fetch success, this is payload', payload);
    return {
      ...state,
      isFetchingAllEmails: false,
      allEmailsArray: payload.allEmailsArray,
    }
  },

  [ALL_EMAIL_FETCH_ERROR]: (state, payload) => {
    return {
      ...state,
      isFetchingAllEmails: false,
    }
  },

  [ML_EMAIL_FETCH_REQUEST]: (state, payload) => {
    return {
      ...state,
      isFetchingMLEmails: true,
    }
  },
  [ML_EMAIL_FETCH_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isFetchingMLEmails: false,
      MLEmailsArray: payload.MLEmailsArray,
    }
  },
  [ML_EMAIL_FETCH_ERROR]: (state, payload) => {
    return {
      ...state,
      isFetchingMLEmails: false,
    }
  },

  [CLEAR_ALL_EMAILS_CACHE]: (state, payload) => {
    return {
      ...state,
      allEmailsArray: [],
    }
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

  //this section is for all the show/hide commands for allEmails tab
  [ALL_EMAILS_SHOW_ONE_FLAG]: (state, payload) => {
    let newState = Object.assign({}, state);
    let { emailId } = payload;
    newState.allEmailsArray.forEach((email, index, list) => {
      if (emailId === email.id) {
        list[index].focusLevel = 'one';
      }
    });
    return newState;
  },

  [ALL_EMAILS_SHOW_ALL_FLAGS]: (state, payload) => {
    let newState = Object.assign({}, state);
    let { emailId } = payload;
    newState.allEmailsArray.forEach((email, index, list) => {
      if (emailId === email.id) {
        list[index].focusLevel = 'allFlags';
      }
    });
    return newState;
  },

  [ALL_EMAILS_SHOW_COMPLETE]: (state, payload) => {
    let newState = Object.assign({}, state);
    let { emailId } = payload;
    newState.allEmailsArray.forEach((email, index, list) => {
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

  [EMAIL_MARK_READ_SUCCESS]: (state, payload) => {
    let newState = Object.assign({}, state);
    let emailID = payload.emailID
    newState.emailsArray.forEach((emailObj, index, list) => {
      if(emailID === emailObj.id) {
        list[index].read = 1;
      }
    })
    return newState;
  },


});
