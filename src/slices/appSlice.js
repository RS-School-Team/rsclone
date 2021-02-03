import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {path} from '../assets/path';


const initialUser = {
  name: {
    firstName: '',
    lastName: '',
  },
  manager: null,
  email: null,
};

const initialState = {
  isMenuOpen: false,
  status: 'idle',
  error: null,
  isLogin: false,
  user: initialUser,
  token: '',
};

export const addUser = createAsyncThunk('app/addUser', async (form) => {
  const response = await fetch(`${path}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  });
  const user = await response.json();
  localStorage.setItem('token', user.token);
  sessionStorage.setItem('token', user.token);
  return user;
});

export const loginUser = createAsyncThunk('app/loginUser', async (form) => {
  const response = await fetch(`${path}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  });
  const user = await response.json();
  localStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('user', JSON.stringify(user));
  return user;
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
    logOut(state, action) {
      state.user = initialUser;
      state.isLogin = false;
      state.token = '';
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    },
    localLogin(state, action) {
      state.user = action.payload
      state.isLogin = true
    }

  },
  extraReducers: {
    [addUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
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
      state.user = action.payload.user;
      state.isLogin = true;
      state.status = 'succeeded';
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { openMenu, closeMenu, finishLoading, logOut, localLogin} = appSlice.actions;

export default appSlice.reducer;
