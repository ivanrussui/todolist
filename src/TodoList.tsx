import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import './App.css';
import { AddItemForm } from './Components/AddItemForm';
import { EditableSpan } from './Components/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button';

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
        <IconButton onClick={removeTodolist} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((el) => {
          return (
            <li key={el.id} className={el.isDone ? 'isDone' : ''}>
              <IconButton onClick={() => removeTaskHandler(el.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <input type="checkbox" checked={el.isDone}
                     onChange={(e) => changeCheckBox(el.id, e)} />
              <EditableSpan value={el.title}
                            onChange={(newValue) => changeTaskNameHandler(el.id, newValue)}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <Button color={'success'}
          // className={props.filter === 'all' ? 'activeFilter' : ''}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={() => changeFilterHandler('all', props.todolistId)}>All
        </Button>
        <Button color={'info'}
                // className={props.filter === 'active' ? 'activeFilter' : ''}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={() => changeFilterHandler('active', props.todolistId)}>Active
        </Button>
        <Button color={'secondary'}
                // className={props.filter === 'completed' ? 'activeFilter' : ''}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={() => changeFilterHandler('completed', props.todolistId)}>Completed
        </Button>
      </div>
    </div>
  )
}