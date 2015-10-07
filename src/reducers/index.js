import { combineReducers } from 'redux';
import counter from './counter';
import emails from './emails';
import users from './users';

export default combineReducers({
  counter,
  emails,
  users,
});
