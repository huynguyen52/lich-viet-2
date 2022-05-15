import { addDoc, collection, doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../../firebase';
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

export const addDailyEvent = (event: {}[]) => (dispatch: any) => {
  dispatch({
    type: ADD_DAILY_EVENT,
    payload: event,
  });
};

export const updateDailyEvent = (eventList: {}[]) => {
  return {
    type: UPDATE_DAILY_EVENT,
    payload: eventList,
  };
};

export const addEventForm = (event: any) => async (dispatch: any) => {
  const time = event.isAllDay
    ? {
        startDate: event.dateTimePickerValue.startDate,
        endDate: event.dateTimePickerValue.endDate,
      }
    : {
        startDate: event.dateTimePickerValue.startDate,
        endDate: event.dateTimePickerValue.endDate,
        startTime: event.dateTimePickerValue.startTime,
        endTime: event.dateTimePickerValue.endTime,
      };
  const newEvent = {
    id: event.id,
    isAllDay: event.isAllDay,
    location: event.location,
    notes: event.textAre,
    title: event.title,
    time: {
      ...time,
    },
  };
  const eventRef = await addDoc(collection(db, 'events'), newEvent);
  dispatch({
    type: ADD_EVENT_FORM,
    payload: { ...newEvent, id: eventRef.id },
  });
};

export const setFormValue = (value: {}) => {
  return {
    type: SET_FORMVALUES,
    payload: value,
  };
};

export const changeSelectedDate = (date: any) => {
  return {
    type: CHANGE_SELECTED_DATE,
    payload: date,
  };
};

export const setEventList = (eventList: any) => {
  return {
    type: SET_EVENT_LIST,
    payload: eventList,
  };
};

export const deleteEvent = (id: any) => {
  return {
    type: DELETE_EVENT,
    payload: id,
  };
};

export const updateEvent = (event: any) => async (dispatch: any) => {
  const time = event.isAllDay
    ? {
        startDate: event.dateTimePickerValue.startDate,
        endDate: event.dateTimePickerValue.endDate,
      }
    : {
        startDate: event.dateTimePickerValue.startDate,
        endDate: event.dateTimePickerValue.endDate,
        startTime: event.dateTimePickerValue.startTime,
        endTime: event.dateTimePickerValue.endTime,
      };
  const newEvent = {
    id: event.id,
    isAllDay: event.isAllDay,
    location: event.location,
    notes: event.textAre,
    title: event.title,
    time: {
      ...time,
    },
  };
  const docRef = doc(db, 'events', newEvent.id);
  updateDoc(docRef, newEvent);
  dispatch({
    type: UPDATE_EVENT,
    payload: newEvent,
  });
};
