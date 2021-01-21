import {ADD_LIST} from './types'

export  const lists = (state = [], action) => {
  switch (action.type) {
    case ADD_LIST:
      return [...state.colors, action.color]
    default:
      return state;
  }

}