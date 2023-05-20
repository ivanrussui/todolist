import { TodolistsType } from '../App';
import { v1 } from 'uuid';

type ActionType = {
  type: string
  [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(el => el.id !== action.id)
    case 'ADD-TODOLIST':
      let newTodolistId3 = v1()
      let newTodolist = { id: newTodolistId3, title: action.title, filter: 'all' }
      return [ ...state, newTodolist ]
    default:
      throw new Error('I don\'t understand this type')
  }
}
