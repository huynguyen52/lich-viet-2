import { CHANGE_YEAR, TOGGLE_YEAR } from '../constants';

export const changeYear = (year: Date) => {
  return {
    type: CHANGE_YEAR,
    payload: year,
  };
};

export const toggleYear = () => {
  return {
    type: TOGGLE_YEAR,
  };
};
