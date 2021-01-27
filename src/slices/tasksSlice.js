import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeList: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    tasksLoaded(state, action) {
      state.activeList = action.payload;
    },
  },
});

export const { tasksLoaded } = tasksSlice.actions;

export default tasksSlice.reducer;
