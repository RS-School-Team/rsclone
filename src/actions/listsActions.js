import {
  SHOW_LOADER,
  HIDE_LOADER,
  LISTS_LOADED,
  TASK_LOADED,
} from '../types/appTypes';

export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}
export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

export function getLists() {
  return async (dispatch) => {
    try {
      const responce = await fetch(
        'http://localhost:3005/lists?_expand-color&_embed=tasks'
      );
      const lists = await responce.json();
      dispatch({ type: LISTS_LOADED, payload: lists });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getTask(list) {
  return {
    type: TASK_LOADED,
    payload: list,
  };
}
