import { CHANGE_YEAR, TOGGLE_YEAR } from '../constants';

const initialState = {
  year: new Date(),
  isShowYear: false,
};

export const yearsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_YEAR:
      return {
        ...state,
        year: action.payload,
      };
    case TOGGLE_YEAR:
      return {
        ...state,
        isShowYear: !state.isShowYear,
      };
    default:
      return state;
  }
};
