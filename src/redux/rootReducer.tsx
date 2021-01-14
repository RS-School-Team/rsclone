import {combineReducers} from "redux";
import {firstReducer} from "./firstRuducer";

export  const rootReducer = combineReducers({
    test: firstReducer,
})