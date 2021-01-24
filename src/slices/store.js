import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../slices/tasksSlice";
import listsReducer from "../slices/listsSlice";
import headerReducer from "../slices/headerSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    lists: listsReducer,
    header: headerReducer,
  },
})