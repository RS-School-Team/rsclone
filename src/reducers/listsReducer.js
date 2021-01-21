import {
  CREATE_NEW_LIST,
  LISTS_LOADED,
  CREATE_LIST_OPEN,
  CREATE_LIST_CLOSE,
} from '../types/appTypes';

const initialState = {
  lists: [],
  isCreateListOpen: false,
};

export const listsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LISTS_LOADED:
      return { ...state, lists: payload };
    case CREATE_LIST_OPEN:
      return { ...state, isCreateListOpen: true };
    case CREATE_LIST_CLOSE:
      return { ...state, isCreateListOpen: false };
    case CREATE_NEW_LIST:
      return { ...state, lists: [...state.lists, payload] };
    default:
      return state;
  }
};
