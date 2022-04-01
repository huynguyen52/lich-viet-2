import { combineReducers } from 'redux';
import { user } from './user';
import { eventReducer } from './eventReducer';

const rootReducers = combineReducers({
  user,
  event: eventReducer,
});

export default rootReducers;
