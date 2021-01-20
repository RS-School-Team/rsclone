import { TASK_LOADED } from '../types/appTypes';

const initialState = {
  activeList: {},
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_LOADED:
      return { ...state, activeList: action.payload };

    default:
      return state;
  }
};
