import { combineReducers } from 'redux';
import counter from './counter';
import emails from './emails';
import users from './users';
import filters from './filters';
import navigation from './navigation';

export default combineReducers({
  counter,
  emails,
  users,
  filters,
  navigation,
});
