import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { listsReducer } from './listsReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  lists: listsReducer,
});
