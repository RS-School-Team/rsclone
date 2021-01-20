import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { listsReducer } from './listsReducer';
import { taskReducer } from './tasksReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  lists: listsReducer,
  tasks: taskReducer,
});
