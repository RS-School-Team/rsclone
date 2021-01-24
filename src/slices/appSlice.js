import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
};

const appSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    openMenu(state, action) {
      state.isMenuOpen = true;
    },
    closeMenu(state, action) {
      state.isMenuOpen = false;
    },
  },
});

export const { openMenu, closeMenu } = appSlice.actions;

export default appSlice.reducer;
