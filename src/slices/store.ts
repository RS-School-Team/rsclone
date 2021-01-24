import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./tasksSlice";
import listsReducer from "./listsSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    lists: listsReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>