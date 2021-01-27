import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
};

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
  },
});

export const { openMenu, closeMenu } = appSlice.actions;

export default appSlice.reducer;
