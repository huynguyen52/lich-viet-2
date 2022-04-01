import { ADD_EVENT, CHANGE_EVENT } from '../constants';

const initialState = {
  currentEvents: [],
};

export const eventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        currentEvents: [...state.currentEvents, action.payload],
      };
    case CHANGE_EVENT:
      return {
        ...state,
        currentEvents: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
