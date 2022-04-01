import { ADD_EVENT, CHANGE_EVENT } from '../constants';

export const addEvent = (event: {}) => (dispatch: any) => {
  dispatch({
    type: ADD_EVENT,
    payload: event,
  });
};

export const changeEvent = (eventList: {}[]) => {
  console.log('vaof day');
  return {
    type: CHANGE_EVENT,
    payload: eventList,
  };
};
