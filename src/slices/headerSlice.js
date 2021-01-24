import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isLogin: false,
  email: '',
  password: '',
  id: '',
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    openLogin(state, action) {
      state.isOpen = true
    },
    closeLogin(state, action) {
      state.isOpen = false
    }
  }
})

export const {
  openLogin,
  closeLogin
} = headerSlice.actions;

export default headerSlice.reducer;