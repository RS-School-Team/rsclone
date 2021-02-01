import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit';
import {path} from '../assets/path'


const initialState = {
  isMenuOpen: false,
  status: 'idle',
  error: null,
};

export const addUser = createAsyncThunk('app/addUser', async (form) => {
  const response = await fetch(`${path}/signUp`, {
    method: 'POST',
    body: form,
    headers: {
      'Content-Type': 'form/multipart',
    },
  });
  const list = await response.json();
  return list;
});

export const loginUser = createAsyncThunk('app/loginUser', async (form) => {
  const response = await fetch(`${path}/signIn`, {
    method: 'POST',
    body: form,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const list = await response.json();
  return list;
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openMenu(state, action) {
      state.isMenuOpen = true;
    },
    closeMenu(state, action) {
      state.isMenuOpen = false;
    },
    finishLoading(state, action) {
      state.status = 'idle'
    }
  },
  extraReducers: {
    [addUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
    },
    [addUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [loginUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  }
});

export const { openMenu, closeMenu, finishLoading } = appSlice.actions;

export default appSlice.reducer;
