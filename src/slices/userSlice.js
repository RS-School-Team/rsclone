import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  id: '',
};

export const signUp = createAsyncThunk('user/signUp', async (value) => {
  const response = await fetch('http://localhost:3005/lists', {
    method: 'POST',
    body: JSON.stringify({
      name: value,
      tasks: [],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const list = await response.json();
  return list;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openLogin(state, action) {
      state.isOpen = true;
    },
    closeLogin(state, action) {
      state.isOpen = false;
    },
  },
});

export const { openLogin, closeLogin } = userSlice.actions;

export default userSlice.reducer;
