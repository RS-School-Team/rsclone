import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { path } from '../assets/path';

const initialState = {
  isMenuOpen: false,
  status: 'idle',
  error: null,
  isAdmin: true,
};

export const addUser = createAsyncThunk('app/addUser', async (form) => {
  const response = await fetch(`${path}/auth/register`, {
    method: 'POST',
    body: form,
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow'
  });
  const user = await response.json();
  return user;
});

export const loginUser = createAsyncThunk('app/loginUser', async (form) => {
  const response = await fetch(`${path}/signIn`, {
    method: 'POST',
    body: form,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: "no-cors"
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
      state.status = 'idle';
    },
  },
  extraReducers: {
    [addUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addUser.fulfilled]: (state, action) => {
      console.log(action.payload)
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
  },
});

export const { openMenu, closeMenu, finishLoading } = appSlice.actions;

export default appSlice.reducer;
