import { INITIAL_DATE } from '../../utils';
import {
  ADD_DAILY_EVENT,
  ADD_EVENT_FORM,
  CHANGE_SELECTED_DATE,
  DELETE_EVENT,
  SET_EVENT_LIST,
  SET_FORMVALUES,
  UPDATE_DAILY_EVENT,
  UPDATE_EVENT,
} from '../constants';

const initialState = {
  dailyEvents: [],
  formValue: {},
  eventList: [],
  selectedDate: INITIAL_DATE,
};

export const eventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_DAILY_EVENT:
      return {
        ...state,
        dailyEvents: [...state.dailyEvents, ...action.payload],
      };
    case UPDATE_DAILY_EVENT:
      return {
        ...state,
        dailyEvents: action.payload,
      };
    case SET_FORMVALUES:
      return {
        ...state,
        formValue: action.payload,
      };
    case ADD_EVENT_FORM:
      return {
        ...state,
        formValue: {},
        eventList: [...state.eventList, action.payload],
      };
    case CHANGE_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    case SET_EVENT_LIST:
      return {
        ...state,
        eventList: action.payload,
      };
    case DELETE_EVENT:
      const newEventList = state.eventList.filter(
        (e: any) => e.id !== action.payload
      );
      const newDailyEvents = state.dailyEvents.filter(
        (e: any) => e.id !== action.payload
      );
      return {
        ...state,
        eventList: newEventList,
        dailyEvents: newDailyEvents,
      };
    case UPDATE_EVENT:
      const id = action.payload.id;
      const newEvents = state.eventList.map((e: any) => {
        if (e.id === id) {
          return {
            ...action.payload,
          };
        }
        return e;
      });
      return {
        ...state,
        eventList: newEvents,
      };
    default:
      return state;
  }
};
