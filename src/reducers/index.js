import { combineReducers } from 'redux';
import counter from './counter';
import emails from './emails';

export default combineReducers({
  counter,
  emails,
});
