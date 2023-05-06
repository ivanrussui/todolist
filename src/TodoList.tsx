import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import './App.css';
import { AddItemForm } from './Components/AddItemForm';
import { EditableSpan } from './Components/EditableSpan';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  title: string
  filter: FilterValuesType
  tasks: Array<TasksType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTaskName: (todolistId: string, taskId: string, updateTitle: string) => void
  changeTodolistName: (todolistId: string, updateTitle: string) => void
}

export const TodoList = (props: PropsType) => {

  const addTask = (title: string) => {
    props.addTask(title, props.todolistId)
  }

  const removeTaskHandler = (id: string) => {
    props.removeTask(id, props.todolistId)
  }

  const changeFilterHandler = (value: FilterValuesType, todolistId: string) => {
    props.changeFilter(value, todolistId)
  }

  const changeCheckBox = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    let isDone = e.currentTarget.checked
    props.changeTaskStatus(id, isDone, props.todolistId)
  }

  const removeTodolist = () => {
    props.removeTodolist(props.todolistId)
  }
  
  const changeTaskNameHandler = (id: string, newValue: string) => {
    props.changeTaskName(props.todolistId, id, newValue)
  }

  const changeTodolistNameHandler = (newValue: string) => {
    props.changeTodolistName(props.todolistId, newValue)
  }

  return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <EditableSpan value={props.title}
                        onChange={changeTodolistNameHandler}
          />
          <button onClick={removeTodolist}>✖</button>
        </div>
        <AddItemForm addItem={addTask} />
        <ul>
          {props.tasks.map((el) => {
            return (
                <li key={el.id} className={el.isDone ? 'isDone' : ''}>
                  <button onClick={() => removeTaskHandler(el.id)}>
                    ✖
                  </button>
                  <input type="checkbox" checked={el.isDone}
                         onChange={(e) => changeCheckBox(el.id, e)} />
                  <EditableSpan value={el.title}
                                onChange={(newValue) => changeTaskNameHandler(el.id, newValue) }
                  />
                </li>
            );
          })}
        </ul>
        <div>
          <button className={props.filter === 'all' ? 'activeFilter' : ''}
                  onClick={() => changeFilterHandler('all', props.todolistId)}>All
          </button>
          <button className={props.filter === 'active' ? 'activeFilter' : ''}
                  onClick={() => changeFilterHandler('active', props.todolistId)}>Active
          </button>
          <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                  onClick={() => changeFilterHandler('completed', props.todolistId)}>Completed
          </button>
        </div>
      </div>
  )
}