import { combineReducers } from 'redux';
import counter from './counter';
import emailsArray from './emailsArray';

export default combineReducers({
  counter,
  emailsArray,
});
