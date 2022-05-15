import { combineReducers } from 'redux';
import { user } from './user';
import { eventReducer } from './eventReducer';
import { zodiacReducer } from './zodiacReducer';
import { yearsReducer } from './yearsReducer';

const rootReducers = combineReducers({
  user,
  event: eventReducer,
  zodiac: zodiacReducer,
  year: yearsReducer,
});

export default rootReducers;
