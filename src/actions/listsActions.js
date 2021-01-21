import {
  SHOW_LOADER,
  HIDE_LOADER,
  LISTS_LOADED,
  TASK_LOADED,
  CREATE_LIST_OPEN,
  CREATE_LIST_CLOSE,
  CREATE_NEW_LIST,
  EDIT_LIST_CLOSE,
  EDIT_LIST_OPEN,
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

export function editListOpen(list) {
  return {
    type: EDIT_LIST_OPEN,
    payload: list,
  };
}
export function editListClose() {
  return {
    type: EDIT_LIST_CLOSE,
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

export function deleteList(id, lists) {
  return async (dispatch) => {
    console.log('delete');
    try {
      const responce = await fetch('http://localhost:3005/lists/' + id, {
        method: 'DELETE',
      });
      const newLists = lists.filter((list) => list.id !== Number(id));
      dispatch({ type: LISTS_LOADED, payload: newLists });
    } catch (err) {
      console.log(err);
    }
  };
}

export function editList(listTitle, id, lists) {
  return async (dispatch) => {
    console.log('edit');
    try {
      const responce = await fetch('http://localhost:3005/lists/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
          name: listTitle,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await responce.json();
      const newLists = lists.map((list) => {
        if (list.id === id) {
          list.name = listTitle;
        }
        return list;
      });
      dispatch({ type: LISTS_LOADED, payload: newLists });
    } catch (err) {
      console.log(err);
    }
  };
}
