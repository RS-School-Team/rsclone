import {
  SHOW_LOADER,
  HIDE_LOADER,
  LISTS_LOADED,
  TASK_LOADED,
  CREATE_LIST_OPEN,
  CREATE_LIST_CLOSE,
  CREATE_NEW_LIST,
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

export function openCreateList() {
  return {
    type: CREATE_LIST_OPEN,
  };
}

export function closeCreateList() {
  return {
    type: CREATE_LIST_CLOSE,
  };
}

export function addList(listTitle) {
  return async (dispatch) => {
    try {
      const responce = await fetch('http://localhost:3005/lists', {
        method: 'POST',
        body: JSON.stringify({
          name: listTitle,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const list = await responce.json();
      dispatch({ type: CREATE_NEW_LIST, payload: list });
    } catch (err) {
      console.log(err);
    }
  };
}
