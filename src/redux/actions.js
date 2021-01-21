import {
    FETCH_COLOR_REQUEST,
    FETCH_COLOR_FAILURE,
    FETCH_COLOR_SUCCESS,
    ADD_TODO,
    ADD_COLOR,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER, ADD_LIST,

} from './types'

/*export function fetchColor(color) {
    return {
        type: FETCH_COLOR_REQUEST,
        color: color,
    }
}*/

export function addTodo(text) {
    return { type: ADD_TODO, text }
}

export function addColor(color) {
    return { type: ADD_COLOR, color }
}
export function addList(list) {
    return { type: ADD_LIST, list }
}

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}
