import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../slices/tasksSlice';
import listsReducer from '../slices/listsSlice';
import appReducer from '../slices/appSlice';
import headerReducer from '../slices/headerSlice';
import userReducer from '../slices/userSlice';
import ordersReducer from '../slices/ordersSlice';

export default configureStore({
  reducer: {
    tasks: taskReducer,
    lists: listsReducer,
    app: appReducer,
    header: headerReducer,
    user: userReducer,
    orders: ordersReducer,
  },
});
