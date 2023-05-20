import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer
} from './todolists-reducer';
import { v1 } from 'uuid'
import { FilterValuesType, TodolistsType } from '../App'

test('correct todolist should be removed', () => {
  let todolistID1 = v1()
  let todolistID2 = v1()

  const startState: Array<TodolistsType> = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' }
  ]

  // const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistID1 })
  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]

  // const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
  const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]

  const action = {
    type: 'CHANGE-TODOLIST-TITLE' as const,
    id: todolistId2,
    title: newTodolistTitle
  }

  // const endState = todolistsReducer(startState, action)
  const endState = todolistsReducer(startState, ChangeTodolistTitleAC(action.id, action.title))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newFilter: FilterValuesType = 'completed'

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]

  const action = {
    type: 'CHANGE-TODOLIST-FILTER' as const,
    id: todolistId2,
    filter: newFilter
  }

  // const endState = todolistsReducer(startState, action)
  const endState = todolistsReducer(startState, ChangeTodolistFilterAC(action.id, action.filter))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

