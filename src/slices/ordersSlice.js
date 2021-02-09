import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../client/client';

const initialState = {
  orders: [],
  teachers: [],
  // pendingOrders: [],
  // acceptedOrders:[],
  // declinedOrders: [],
  // archivedOrders:[]
};
export const fetchTeachers = createAsyncThunk(
  'orders/fetchTeachers',
  async (token) => {
    const response = await apiClient('/users', 'GET', token);
    const teachers = await response.json();
    return teachers;
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (token) => {
    const response = await apiClient('/order', 'GET', token);
    const orders = await response.json();
    console.log(orders);
    return orders;
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ([teacherID, token]) => {
    console.log(teacherID, token);
    const response = await apiClient(`/order/${teacherID}`, 'POST', token);
    const order = await response.json();
    console.log(order);
    return order;
  }
);

const orderSlice = createSlice({
  name: 'order',
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

    localLogin(state, action) {
      state.user = action.payload;
      state.isLogin = true;
    },
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createOrder.fulfilled]: (state, action) => {
      state.orders.push(action.payload);
      state.status = 'succeeded';
    },
    [createOrder.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [fetchTeachers.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.teachers = action.payload;
      state.status = 'succeeded';
    },
    [fetchTeachers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [fetchOrders.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.status = 'succeeded';
    },
    [fetchOrders.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { openMenu } = orderSlice.actions;

export default orderSlice.reducer;
