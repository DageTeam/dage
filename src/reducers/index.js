import { combineReducers } from 'redux';
import counter from './counter';
import emails from './emails';
import userSession from './userSession';
import filters from './filters';
import navigation from './navigation';

export default combineReducers({
  counter,
  emails,
  userSession,
  filters,
  navigation,
});
