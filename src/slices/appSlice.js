import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../client/client';

const initialUser = {
  name: {
    firstName: '',
    lastName: '',
  },
  manager: null,
  email: null,
  _id: null,
  project: [],
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
  const response = await apiClient(
    '/auth/register',
    'POST',
    null,
    JSON.stringify(form)
  );

  const user = await response.json();
  localStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('user', JSON.stringify(user));

  return user;
});

export const loginUser = createAsyncThunk('app/loginUser', async (form) => {
  try {
    const response = await apiClient(
      '/auth/login',
      'POST',
      null,
      JSON.stringify(form)
    );
    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (e) {}
});

export const loginLocalUser = createAsyncThunk(
  'app/loginUser',
  async (token) => {
    const response = await apiClient('/users/my', 'GET', token);
    const newUser = await response.json();
    const user = {
      user: newUser,
      token: token,
    };
    localStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
  }
);

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
      state.user = action.payload;
      state.isLogin = true;
    },
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
      if (action.payload.statusCode) {
        state.error = action.payload;
        state.isLogin = false;
      } else {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isLogin = true;
      }
      state.status = 'succeeded';
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  openMenu,
  closeMenu,
  finishLoading,
  logOut,
  localLogin,
} = appSlice.actions;

export default appSlice.reducer;
