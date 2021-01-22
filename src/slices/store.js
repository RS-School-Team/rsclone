import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../slices/tasksSlice";
import listsReducer from "../slices/listsSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    lists: listsReducer,
  },
})