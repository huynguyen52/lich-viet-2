import { getAuth } from 'firebase/auth';
import { USER_STATE_CHANGE } from '../constants';

export function fetchUser() {
  console.log('hello');
  return (dispatch: any) => {
    console.log('hello2');
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('user');
    if (user != null) {
      dispatch({ type: USER_STATE_CHANGE, currentUser: user });
    } else {
      console.log('does not exit');
    }
  };
}
