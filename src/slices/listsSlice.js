import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../client/client';

const initialState = {
  lists: [],
  isCreateListOpen: false,
  isEditListOpen: false,
  editingList: {},
  status: 'idle',
  error: null,
  isDeleteListOpen: false,
  deletingList: {},
  isDeleteTaskOpen: false,
  deletingTask: {},
};

export const addList = createAsyncThunk(
  'lists/addList',
  async ([project, token]) => {
    const response = await apiClient(
      '/project',
      'POST',
      token,
      JSON.stringify(project)
    );

    const list = await response.json();
    console.log(list);
    return list;
  }
);

export const fetchLists = createAsyncThunk(
  'lists/fetchLists',
  async (token) => {
    const response = await apiClient('/project', 'GET', token);
    const data = await response.json();
    return data;
  }
);

export const deleteList = createAsyncThunk(
  'lists/deleteLists',
  async ([id, token]) => {
    const response = await apiClient(`/project/${id}`, 'DELETE', token);
    return id;
  }
);

export const editList = createAsyncThunk(
  'lists/editLists',
  async ([{ title, id }, token]) => {
    const response = await apiClient(
      `/project/${id}`,
      'PUT',
      token,
      JSON.stringify({
        name: title,
      })
    );

    return { title, id };
  }
);
export const addTask = createAsyncThunk('lists/addTask', async (task) => {
  const response = await fetch('http://localhost:3005/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const newTask = await response.json();
  return newTask;
});

export const editTask = createAsyncThunk(
  'lists/editTask',
  async ({ id, title, description }) => {
    const response = await fetch('http://localhost:3005/tasks/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newTask = await response.json();
    return newTask;
  }
);
export const deleteTask = createAsyncThunk(
  'lists/deleteTask',
  async ({ id, listId }) => {
    const response = await fetch('http://localhost:3005/tasks/' + Number(id), {
      method: 'DELETE',
    });
    return { id, listId };
  }
);
const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    localList(state, action) {
      state.lists = action.payload;
    },
    createListOpen(state, action) {
      state.isCreateListOpen = true;
    },
    createListClose(state, action) {
      state.isCreateListOpen = false;
    },
    editListOpen(state, action) {
      state.isEditListOpen = true;
      state.editingList = action.payload;
    },
    editListClose(state, action) {
      state.isEditListOpen = false;
    },
    createNewList(state, action) {
      state.lists.push(action.payload);
    },
    deleteListOpen(state, action) {
      state.isDeleteListOpen = true;
      state.deletingList = action.payload;
    },
    deleteListClose(state, action) {
      state.isDeleteListOpen = false;
    },
    deleteTaskOpen(state, action) {
      state.isDeleteTaskOpen = true;
      state.deletingTask = action.payload;
    },
    deleteTaskClose(state, action) {
      state.isDeleteTaskOpen = false;
    },
  },
  extraReducers: {
    [fetchLists.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchLists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.lists = action.payload;
    },
    [fetchLists.rejected]: (state, action) => {
      state.status = 'failed';
      console.log(action.payload);
      state.error = action.payload;
    },
    [deleteList.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deleteList.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const id = action.payload;
      const newLists = state.lists.filter((list) => list._id !== id);
      state.lists = [...newLists];
    },
    [deleteList.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [editList.pending]: (state, action) => {
      state.status = 'loading';
    },
    [editList.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const { title, id } = action.payload;
      const newLists = state.lists.map((list) => {
        if (list._id === id) {
          list.name = title;
        }
        return list;
      });
      state.lists = newLists;
    },
    [editList.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [addList.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addList.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.lists.push(action.payload);
    },
    [addList.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [addTask.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addTask.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const task = action.payload;
      const newLists = state.lists.map((list) => {
        if (list.id === task.id) {
          list.tasks.push(task);
        }
        return list;
      });
      state.lists = newLists;
    },
    [addTask.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [editTask.pending]: (state, action) => {
      state.status = 'loading';
    },
    [editTask.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const newTask = action.payload;
      const newLists = state.lists.map((list) => {
        if (list.id === newTask.listId) {
          list.tasks.map((task) => {
            if (task.id === newTask.id) {
              task.title = newTask.title;
              task.description = newTask.description;
            }
            return task;
          });
        }
        return list;
      });
      state.lists = newLists;
    },
    [editTask.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [deleteTask.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const { id, listId } = action.payload;
      const newLists = state.lists.map((list) => {
        if (Number(listId) === list.id) {
          const tasks = list.tasks.filter((task) => task.id !== Number(id));
          list.tasks = tasks;
        }
        return list;
      });
      state.lists = newLists;
    },
    [deleteTask.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  createListOpen,
  createListClose,
  editListOpen,
  editListClose,
  createNewList,
  deleteListClose,
  deleteListOpen,
  deleteTaskOpen,
  deleteTaskClose,
  localList,
} = listSlice.actions;

export default listSlice.reducer;
