import { SET_DATE, TOGGLE_SHOW_ZODIAC } from '../constants';

const initialState = {
  isZodiacShow: true,
  date: new Date(),
};

export const zodiacReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_SHOW_ZODIAC:
      return {
        ...state,
        isZodiacShow: action.payload,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};
