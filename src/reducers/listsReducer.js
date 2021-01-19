import { LISTS_LOADED } from '../types/appTypes';

const initialState = {
  lists: [],
};

export const listsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LISTS_LOADED:
      return payload;
    default:
      return state;
  }
};
