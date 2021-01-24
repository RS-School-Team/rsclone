import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../slices/tasksSlice';
import listsReducer from '../slices/listsSlice';
import appReducer from '../slices/appSlice';

export default configureStore({
  reducer: {
    tasks: taskReducer,
    lists: listsReducer,
    app: appReducer,
  },
});
