import React, { ChangeEvent, useCallback } from 'react';
import { FilterValuesType } from './App';
import './App.css';
import { AddItemForm } from './Components/AddItemForm';
import { EditableSpan } from './Components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

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

export const Todolist = (props: PropsType) => {

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.todolistId)
  }, [])

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
      <div>
        <EditableSpan value={props.title}
                      onChange={changeTodolistNameHandler}
        />
        <IconButton onClick={removeTodolist} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addTask} />
      <div>
        {props.tasks.map((el) => {
          return (
            <div key={el.id} className={el.isDone ? 'isDone' : ''}>
              <Checkbox
                checked={el.isDone}
                onChange={(e) => changeCheckBox(el.id, e)}
                color={'secondary'}
              />
              <EditableSpan value={el.title}
                            onChange={(newValue) => changeTaskNameHandler(el.id, newValue)}
              />
              <IconButton onClick={() => removeTaskHandler(el.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div style={{marginTop: '5px', display: 'flex', gap: '5px'}}>
        <Button color={'success'}
                variant={props.filter === 'all' ? 'contained' : 'outlined'}
                onClick={() => changeFilterHandler('all', props.todolistId)}>All
        </Button>
        <Button color={'secondary'}
                variant={props.filter === 'active' ? 'contained' : 'outlined'}
                onClick={() => changeFilterHandler('active', props.todolistId)}>Active
        </Button>
        <Button color={'info'}
                variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                onClick={() => changeFilterHandler('completed', props.todolistId)}>Completed
        </Button>
      </div>
    </div>
  )
}