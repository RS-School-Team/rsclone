import {firstState} from "./types";


const initialState:firstState = {
    text: 'initial text'
}

export const firstReducer = (state = initialState) => {
    return state
}