import { SET_DATE, TOGGLE_SHOW_ZODIAC } from '../constants';

export const toggleShowZodiac = (isShow: boolean) => {
  return {
    type: TOGGLE_SHOW_ZODIAC,
    payload: isShow,
  };
};

export const setDate = (date: Date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};
