import React, { useState } from 'react';
import './App.css';
import { TasksType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './Components/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';


type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TasksType>
}

const App = () => {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [ todolists, setTodolists ] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [ tasks, setTasks ] = useState<TaskStateType>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ]
  })

  const changeTaskName = (todolistId: string, id: string, newValue: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(el => el.id === id ? { ...el, title: newValue } : el)
    })
  }

  const changeTodolistName = (todolistId: string, newValue: string) => {
    setTodolists(todolists.map(el => el.id === todolistId ? { ...el, title: newValue } : el))
  }

  const addTodoList = (title: string) => {
    let newTodolistID = v1()
    let newTodolist: TodolistsType = { id: newTodolistID, title, filter: 'all' }
    setTodolists([ newTodolist, ...todolists ])
    setTasks({ ...tasks, [newTodolistID]: [] })
  }

  const removeTask = (id: string, todolistId: string) => {
    // достанем нужный массив по todolistId
    let todolistTasks = tasks[todolistId]

    // перезапишем в этом объекте массив для нужного тудулиста с отфильтрованным массивом
    tasks[todolistId] = todolistTasks.filter(task => task.id !== id)

    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({ ...tasks })
  }

  const addTask = (title: string, todolistId: string) => {
    let task = { id: v1(), title: title, isDone: false }

    // достанем нужный массив по todolistId
    let todolistTask = tasks[todolistId]

    // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску
    tasks[todolistId] = [ task, ...todolistTask ]

    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({ ...tasks })
  }

  const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
    // достанем нужный массив по todolistId
    let todolistTasks = tasks[todolistId]

    // найдем нужную таксу
    let task = todolistTasks.find(task => task.id === id)

    // изменим таксу, если она нашлась
    if (task) {
      task.isDone = isDone

      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({ ...tasks })
    }
  }

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([ ...todolists ])
    }
  }

  const removeTodolist = (id: string) => {
    // добавим в стейт список тудулистов, id которых не равны тому, который нужно удалить
    setTodolists(todolists.filter(todolist => todolist.id !== id))

    // удалим такси для этого тудулиста из второго стейта,где иы отдельно храним такси
    delete tasks[id]

    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({ ...tasks })
  }

  return (
      <div className="App">
        <AddItemForm addItem={addTodoList} />
        {
          todolists.map(todolist => {
            let allTodolistTasks = tasks[todolist.id]
            let tasksForTodolist = allTodolistTasks

            if (todolist.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
            }
            if (todolist.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
            }
            return <TodoList key={todolist.id}
                             todolistId={todolist.id}
                             title={todolist.title}
                             filter={todolist.filter}
                             tasks={tasksForTodolist}
                             removeTask={removeTask}
                             changeFilter={changeFilter}
                             addTask={addTask}
                             changeTaskStatus={changeTaskStatus}
                             removeTodolist={removeTodolist}
                             changeTaskName={changeTaskName}
                             changeTodolistName={changeTodolistName}
            />
          })
        }
      </div>
  );
}

export default App;
