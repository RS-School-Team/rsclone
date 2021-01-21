import { combineReducers } from 'redux'
import {tasks} from './taskReducer';
import {colors} from "./colorReducer";
import {lists} from "./lilstsReducer";

const todoApp = combineReducers({
  lists,
  colors,
  tasks,
})

export default todoApp