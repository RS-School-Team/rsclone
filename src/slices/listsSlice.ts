import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  lists: [],
  isCreateListOpen: false,
  isEditListOpen: false,
  editingList: {},
  status: 'idle',
  error: null,
};

export const addList = createAsyncThunk(
  ('lists/addList'),
  async (title: string) => {
  const response = await fetch('http://localhost:3005/lists', {
    method: 'POST',
    body: JSON.stringify({
      name: title,
      tasks: [],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const list = await response.json();
  return list;
})

export const fetchLists = createAsyncThunk ('lists/fetchLists', async () => {
  const response = await fetch('http://localhost:3005/lists?_expand-color&_embed=tasks');
  const data = await response.json()
  return data
})

export const deleteList = createAsyncThunk ('lists/deleteLists', async (id) => {
  const response = await fetch('http://localhost:3005/lists/' + id, {
    method: 'DELETE',
  });
  return id
})

export const editList = createAsyncThunk('lists/editLists', async ({title, id}) => {
  const response = await fetch('http://localhost:3005/lists/' + id, {
    method: 'PATCH',
    body: JSON.stringify({
      name: title,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return {title, id}
})

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    createListOpen(state, action) {
      state.isCreateListOpen = true
    },
    createListClose(state) {
      state.isCreateListOpen = false
    },
    editListOpen(state, action) {
      state.isEditListOpen = true
      state.editingList = action.payload
    },
    editListClose(state, action) {
      state.isEditListOpen = false
    },
    createNewList(state, action) {
      state.lists.push(action.payload)
    }
  },
  extraReducers: {
    [fetchLists.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchLists.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.lists = action.payload
    },
    [fetchLists.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [deleteList.pending]: (state, action) => {
      state.status = 'loading'
    },
    [deleteList.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      const id = action.payload
      const newLists = state.lists.filter((list) => list.id !== Number(id))
      state.lists = newLists
    },
    [deleteList.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [editList.pending]: (state, action) => {
      state.status = 'loading'
    },
    [editList.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      console.log(action.payload)
      const {title, id} = action.payload
      const newLists = state.lists.map((list) => {
        if (list.id === id) {
          list.name = title;
        }
        return list;
      });
      state.lists = newLists
    },
    [editList.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [addList.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addList.fulfilled]: (state, action) => {
      state.lists.push(action.payload)
    },
    [addList.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const {
  createListOpen,
  createListClose,
  editListOpen,
  editListClose,
  createNewList,
} = listSlice.actions


export default listSlice.reducer;
