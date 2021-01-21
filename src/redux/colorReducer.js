import {ADD_COLOR} from './types'

export  const colors = (state = [], action) => {
  switch (action.type) {
    case ADD_COLOR:
      return [...state.colors, action.color]
    default:
      return state;
  }

}


